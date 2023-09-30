import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleGeocodingService {

  constructor() { }
  geocodeLatLng(coordinates: google.maps.LatLngLiteral | google.maps.LatLng) {
    let geocoder = new google.maps.Geocoder();

    return geocoder.geocode({ 'location': coordinates });
  }
}
