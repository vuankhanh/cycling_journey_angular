import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription, fromEvent, map, of } from 'rxjs';
import { MilestoneService } from '../shared/services/api/backend/milestone.service';
import { Milestone, MilestonesResponse } from '../shared/models/Milestones';
import { BreakpointDetectionService } from '../shared/services/breakpoint-detection.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeactivatableComponent } from '../shared/core/guard/component-are-destroyed.guard';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss'],
  host: {
    class: 'presentContainer'
  }
})
export class PresentComponent implements DeactivatableComponent{
  @ViewChild('milestonesTemp') milestonesTemp!: TemplateRef<any>;
  @ViewChild('anotherTemplate') anotherTemplate!: TemplateRef<any>;
  breakpointDetection$: Observable<boolean> = of(false);
  milestones: Array<Milestone> = [];

  milestoneItemClicked?: Milestone;

  subscription: Subscription = new Subscription()
  constructor(
    private matDialog: MatDialog,
    private matBottomSheet: MatBottomSheet,
    private milestoneService: MilestoneService,
    private breakpointDetectionService: BreakpointDetectionService
  ){
    this.breakpointDetection$ = this.breakpointDetectionService.detection$();
  }
  ngOnInit(){
    this.getMilestones();
    this.subscription.add(
      fromEvent(window, 'popstate').subscribe(res=>{
        if(this.matDialog.openDialogs.length>0){
          history.pushState(null, '');
        }  
      })
    )
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
    this.closeMilestoneMenu();
  }

  toggle(){
    this.openBottomSheet();
  }

  closeMilestoneMenu(){
    this.matBottomSheet.dismiss();
  }

  openBottomSheet(): void {
    const bottomSheet = this.matBottomSheet.open(this.milestonesTemp);
  }

  canDeactivate(){
    return true
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
