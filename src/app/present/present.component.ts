import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, fromEvent, of } from 'rxjs';
import { MilestoneService } from '../shared/services/api/backend/milestone.service';
import { Milestone, MilestonesResponse } from '../shared/models/Milestones';
import { BreakpointDetectionService } from '../shared/services/breakpoint-detection.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeactivatableComponent } from '../shared/core/guard/component-are-destroyed.guard';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from '../shared/services/api/backend/config.service';
import { Config } from '../shared/models/Config';

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
  config!: Config;
  milestones: Array<Milestone> = [];

  milestoneItemClicked$: BehaviorSubject<Milestone | null> = new BehaviorSubject<Milestone | null>(null);

  subscription: Subscription = new Subscription()
  constructor(
    private matDialog: MatDialog,
    private matBottomSheet: MatBottomSheet,
    private milestoneService: MilestoneService,
    private breakpointDetectionService: BreakpointDetectionService,
    private configService: ConfigService
  ){
    this.breakpointDetection$ = this.breakpointDetectionService.detection$();
  }
  ngOnInit(){
    this.getConfig();
    this.getMilestones();
    this.subscription.add(
      fromEvent(window, 'popstate').subscribe(res=>{
        if(this.matDialog.openDialogs.length>0){
          history.pushState(null, '');
        }  
      })
    )
  }

  private getConfig(){
    this.subscription.add(
      this.configService.get().subscribe(res=>{
        this.config = res.metaData;
      })
    )
  }

  redirectToFacebook(fbId?: string){
    window.open(`https://facebook.com/${fbId || 'vu.khanh'}`, '_blank')
  }

  private getMilestones(){
    this.subscription.add(
      this.milestoneService.getAllData().subscribe(data=>{
        this.milestones = data.sort((a, b)=>a.numericalOrder-b.numericalOrder);
      })
    )
  }

  listenItemClick(milestone: Milestone){
    this.milestoneItemClicked$.next(milestone)
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
