import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MilestoneData, NewMilestonesComponent } from 'src/app/shared/components/new-milestones/new-milestones.component';
import { Milestone } from 'src/app/shared/models/Milestones';


@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent {
  @Input() milestones: Array<Milestone> = [];

  @Output() updateMilestone = new EventEmitter<Milestone>();

  subscription: Subscription = new Subscription();
  constructor(
    private dialog: MatDialog
  ){

  }
  ngOnInit(){
    
  }

  update(milestone: Milestone){
    const milestoneData: MilestoneData = {
      state: 'update',
      data: milestone
    }
    const dialogRef = this.dialog.open(NewMilestonesComponent, {
      data: milestoneData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const milestoneIsUpdated: Milestone = result;
        this.updateMilestone.emit(milestoneIsUpdated);
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
