import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Pipe({
  name: 'baseUrl'
})
export class SetBaseUrlPipe implements PipeTransform {
  private backend: string = environment.backendStatic;
  transform(url: string): string {
    return this.backend + '/'+ url;
  }

}
