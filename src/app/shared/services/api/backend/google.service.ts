import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PolylineResponse } from 'src/app/shared/models/Polyline';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  private url: string = environment.backendApi+'/forward/google';
  constructor(
    private httpClient: HttpClient
  ) { }
  updateDirection(){
    return this.httpClient.post<PolylineResponse>(this.url+'/update_directions', null);
  }
}
