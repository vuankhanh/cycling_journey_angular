import { Component, Input } from '@angular/core';
import { Milestone } from 'src/app/shared/models/Milestones';


@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent {
  @Input() milestones: Array<Milestone> = [];
  constructor(
    
  ){

  }
  ngOnInit(){
    
  }

  ngOnDestroy(){
  }
}
