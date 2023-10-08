import { Component } from '@angular/core';
import { BreakpointDetectionService } from './shared/services/breakpoint-detection.service';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  breakpointDetection$: Observable<boolean> = of(false);
  menu = [
    { name: 'Hành trình', route: 'journey' },
    { name: 'Album', route: 'albums' },
  ]
  constructor(
    private breakpointDetectionService: BreakpointDetectionService
  ){
    this.breakpointDetection$ = this.breakpointDetectionService.detection$()
  }
}
