import { Component } from '@angular/core';
import { MilestoneService } from '../shared/services/api/backend/milestone.service';
import { Milestone, MilestonesResponse } from '../shared/models/Milestones';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent {
  milestones: Array<Milestone> = [];
  subscription: Subscription = new Subscription();
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
        console.log(res);
        let milestoneRespone: MilestonesResponse = res;
        this.milestones = milestoneRespone.metaData;
      })
    )
  }

  listenNewMilestone(newMilestone: Milestone){
    console.log(newMilestone);
    this.milestones.push(newMilestone)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
