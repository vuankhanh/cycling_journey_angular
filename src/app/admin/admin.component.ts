import { Component } from '@angular/core';
import { BreakpointDetectionService } from '../shared/services/breakpoint-detection.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  breakpointDetection$: Observable<boolean> = of(false);
  menu = [
    { name: 'Hành trình', route: 'journey' },
    { name: 'Album', route: 'album' },
  ]
  constructor(
    private breakpointDetectionService: BreakpointDetectionService
  ){
    this.breakpointDetection$ = this.breakpointDetectionService.detection$()
  }
}
