import { Component } from '@angular/core';
import { MilestoneService } from '../../services/api/backend/milestone.service';
import { Subscription } from 'rxjs';
import { Milestones, MilestonesResponse } from '../../models/Milestones';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent {
  milestones: Array<Milestones> = [];
  subscription: Subscription = new Subscription();
  constructor(
    private milestoneService: MilestoneService
  ){

  }
  ngOnInit(){
    this.subscription.add(
      this.milestoneService.getAll().subscribe(res=>{
        console.log(res);
        let milestoneRespone: MilestonesResponse = res;
        this.milestones = milestoneRespone.metaData;
      })
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
