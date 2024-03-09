import { Component, ElementRef, EventEmitter, Input, Output, QueryList, SimpleChange, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListItem } from '@angular/material/list';
import { BehaviorSubject, Subject, Subscription, debounceTime } from 'rxjs';
import { MilestoneData, NewMilestonesComponent } from 'src/app/shared/components/new-milestones/new-milestones.component';
import { Milestone } from 'src/app/shared/models/Milestones';


@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent {
  @ViewChild('app-milestones') appMilestones?: MilestonesComponent;
  @ViewChildren(MatListItem, { read: ElementRef }) items!: QueryList<ElementRef>;
  @Input() milestones: Array<Milestone> = [];
  @Output() updateMilestone = new EventEmitter<Milestone>();
  private searchSubject = new Subject<string>();
  
  subscription: Subscription = new Subscription();
  constructor(
    private dialog: MatDialog
  ){ }
  
  ngOnInit(){
    
  }

  ngAfterViewInit(){
    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(200) // delay 500ms
      ).subscribe(value => {
        const matListItem = this.items.find(item => item.nativeElement.id.startsWith(value));
        if(matListItem){
          matListItem.nativeElement.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
          matListItem.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          setTimeout(() => {
            matListItem.nativeElement.style.backgroundColor = '';
          }, 1500);
        }
      })
    )
  }

  applyFilter(event: KeyboardEvent){
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.searchSubject.next(value);
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
