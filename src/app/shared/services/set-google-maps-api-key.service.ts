import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class SetGoogleMapsApiKeyService {

  constructor() { }
  async append() {
    await this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${environment.googleMapApiKey}&libraries=geometry`)
  }

  loadScript(name: string) {
    return new Promise<null>((resolve, reject) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = name;
      document.getElementsByTagName('head')[0].appendChild(script);
      setTimeout(() => {
        resolve(null)
      }, 500);
    });
  }
}
