import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDisableDefaultRightMouseClick]'
})
export class DisableDefaultRightMouseClickDirective {

  constructor(
    private elementRef: ElementRef
  ) { }
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: PointerEvent) {
    const checkIsTargeted = this.elementRef.nativeElement.contains(event.target);
    if(checkIsTargeted){
      event.preventDefault();
    }
    return;
  }
}
