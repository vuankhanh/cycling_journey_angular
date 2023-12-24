import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeMessage'
})
export class SafeMessagePipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  transform(value: any, args: 'html' | 'style' | 'script' | 'url' | 'resourceUrl'): any  {
    switch (args) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
      default: return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
  }
}
