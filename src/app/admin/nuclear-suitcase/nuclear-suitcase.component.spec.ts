import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuclearSuitcaseComponent } from './nuclear-suitcase.component';

describe('NuclearSuitcaseComponent', () => {
  let component: NuclearSuitcaseComponent;
  let fixture: ComponentFixture<NuclearSuitcaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuclearSuitcaseComponent]
    });
    fixture = TestBed.createComponent(NuclearSuitcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
