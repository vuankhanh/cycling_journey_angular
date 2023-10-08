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
  getDetail(mediaId: string){
    return this.httpClient.get<AlbumDetailRespone>(this.url+'/'+mediaId);
  }
  create(name: string, files: Array<Blob>, description: string){
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
}
