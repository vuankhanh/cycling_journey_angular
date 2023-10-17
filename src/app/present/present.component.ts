import { Component, ViewChild } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { MilestoneService } from '../shared/services/api/backend/milestone.service';
import { Milestone, MilestonesResponse } from '../shared/models/Milestones';
import { BreakpointDetectionService } from '../shared/services/breakpoint-detection.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss']
})
export class PresentComponent {
  @ViewChild('snav', { static: true }) snav!: MatSidenav;
  breakpointDetection$: Observable<boolean> = of(false);
  milestones: Array<Milestone> = [];

  milestoneItemClicked?: Milestone;

  subscription: Subscription = new Subscription()
  constructor(
    private milestoneService: MilestoneService,
    private breakpointDetectionService: BreakpointDetectionService
  ){
    this.breakpointDetection$ = this.breakpointDetectionService.detection$()
  }
  ngOnInit(){
    this.getMilestones();
  }

  private getMilestones(){
    this.subscription.add(
      this.milestoneService.getAll().subscribe(res=>{
        let milestoneRespone: MilestonesResponse = res;
        this.milestones = milestoneRespone.metaData.sort((a, b)=>a.numericalOrder-b.numericalOrder);
      })
    )
  }

  listenItemClick(milestone: Milestone){
    this.milestoneItemClicked = milestone;
    this.toggle();
  }

  toggle(){
    console.log('toggle...');
    
    this.snav.toggle();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
