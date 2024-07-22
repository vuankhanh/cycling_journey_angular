import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, expand, map, toArray } from 'rxjs';
import { AlbumDetailRespone, AlbumResponse } from 'src/app/shared/models/Album';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private url: string = environment.backendApi+'/album'
  constructor(
    private httpClient: HttpClient
  ) { }
  getAll(page?: number, size?: number){
    let params = new HttpParams();
    if(page != undefined){
      params = params.append('page', page)
    }
    if(size != undefined){
      params = params.append('size', size)
    }
    return this.httpClient.get<AlbumResponse>(this.url, { params });
  }
  getAllData(){
    let page = 1;
    return this.getAll().pipe(
      expand(res =>{
        page++;
        const metaData = res.metaData;
        const paging = metaData.paging;
        return page <= paging.totalPages && res ? this.getAll(page) : EMPTY
      }),
      toArray(),
      map((arr: Array<AlbumResponse>)=>{
        const data = arr.map(res=>res.metaData.data).flat();
        return data
      })
    );
  }
  getDetail(detailParams: DetailParams){
    let params = new HttpParams();
    for(const [k, v] of Object.entries(detailParams)){
      params = params.append(k, v)
    }
    return this.httpClient.get<AlbumDetailRespone>(this.url+'/detail', { params });
  }
  create(name: string, description: string, files: Array<Blob>){
    let params = new HttpParams();
    params = params.append('name', name)
    const formData = new FormData();
    if(files.length){
      for(let [index, file] of files.entries()){
        formData.append('many-files', file);
      }
    }
    formData.append('description', description);
    return this.httpClient.post<AlbumDetailRespone>(this.url, formData, { params });
  }
  modify(id: string, name: string, description: string, files: Array<Blob>, filesWillRemove: Array<string>){
    const formData = new FormData();
    if(files.length){
      for(let [index, file] of files.entries()){
        formData.append('many-files', file);
      }
    }
    formData.append('name', name);
    formData.append('description', description);
    formData.append('filesWillRemove', JSON.stringify(filesWillRemove));
    return this.httpClient.patch<AlbumDetailRespone>(this.url+'/'+id, formData);
  }
}

export interface DetailParams{
  id?: string,
  route?: string
}