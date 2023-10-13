import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  getAll(){
    return this.httpClient.get<AlbumResponse>(this.url);
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