import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadLocationJsonService {
  private url = 'assets/google_map.json'
  constructor(
    private httpClient: HttpClient
  ) { }
  get(){
    return this.httpClient.get<Array<google.maps.DirectionsResult | string>>(this.url);
  }
}
