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
    console.log(event);
    
    console.log(event.target);
    
    const checkIsTargeted = this.elementRef.nativeElement.contains(event.target);
    if(checkIsTargeted){
      event.preventDefault();
    }
    return;
  }
}
