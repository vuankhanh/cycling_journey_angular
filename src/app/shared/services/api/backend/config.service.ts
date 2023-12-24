import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigResponse } from 'src/app/shared/models/Config';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url: string = environment.backendApi;
  constructor(
    private httpClient: HttpClient
  ) { }

  get(){
    return this.httpClient.get<ConfigResponse>(this.url+'/config');
  }
}
