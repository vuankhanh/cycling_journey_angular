import { Component } from '@angular/core';
import { MilestoneService } from '../../shared/services/api/backend/milestone.service';
import { Milestone, MilestonesResponse } from '../../shared/models/Milestones';

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
      this.milestoneService.getAllData().subscribe(res=>{
        this.milestones = res;
      })
    )
  }

  listenNewMilestone(newMilestone: Milestone){
    this.milestones.push(newMilestone)
  }

  listenUpdateMilestone(updatedMilestone: Milestone){
    for(const i in this.milestones){
      if(this.milestones[i]._id === updatedMilestone._id){
        this.milestones[i] = updatedMilestone;
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
