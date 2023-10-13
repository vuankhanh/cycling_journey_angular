import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Milestone } from 'src/app/shared/models/Milestones';

@Component({
  selector: 'present-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent {
  @Input() milestones: Array<Milestone> = [];
  @Output() itemClickEmit: EventEmitter<Milestone> = new EventEmitter<Milestone>();
  openWindowMarker(milestone: Milestone){
    this.itemClickEmit.emit(milestone);
  }
}
