import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MilestoneService } from '../shared/services/api/backend/milestone.service';
import { Milestone, MilestonesResponse } from '../shared/models/Milestones';

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss']
})
export class PresentComponent {
  milestones: Array<Milestone> = [];

  milestoneItemClicked?: Milestone;

  subscription: Subscription = new Subscription()
  constructor(
    private milestoneService: MilestoneService
  ){

  }
  ngOnInit(){
    this.getMilestones();
  }

  private getMilestones(){
    this.subscription.add(
      this.milestoneService.getAll().subscribe(res=>{
        let milestoneRespone: MilestonesResponse = res;
        this.milestones = milestoneRespone.metaData;
      })
    )
  }

  listenItemClick(milestone: Milestone){
    this.milestoneItemClicked = milestone;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
