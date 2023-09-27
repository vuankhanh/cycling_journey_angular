import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMilestonesComponent } from './new-milestones.component';

describe('NewMilestonesComponent', () => {
  let component: NewMilestonesComponent;
  let fixture: ComponentFixture<NewMilestonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMilestonesComponent]
    });
    fixture = TestBed.createComponent(NewMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
