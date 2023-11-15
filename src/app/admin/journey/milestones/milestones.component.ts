import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @ViewChild('app-milestones') appMilestones?: MilestonesComponent
  @Input() milestones: Array<Milestone> = [];

  @Output() updateMilestone = new EventEmitter<Milestone>();
  elem: ElementRef
  subscription: Subscription = new Subscription();
  constructor(
    elem: ElementRef,
    private dialog: MatDialog
  ){
    this.elem = elem
  }
  ngOnInit(){
    
  }

  ngAfterViewInit(){
    this.scrollToBottom();
  }

  private scrollToBottom(){
    setTimeout(() => {
      this.elem.nativeElement.scrollTop = this.elem.nativeElement.scrollHeight;
    })
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
        this.scrollToBottom();
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
