import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSelectionDialogBoxComponent } from './album-selection-dialog-box.component';

describe('AlbumSelectionDialogBoxComponent', () => {
  let component: AlbumSelectionDialogBoxComponent;
  let fixture: ComponentFixture<AlbumSelectionDialogBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumSelectionDialogBoxComponent]
    });
    fixture = TestBed.createComponent(AlbumSelectionDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
