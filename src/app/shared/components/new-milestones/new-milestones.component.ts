import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputOnlyNumberDirective } from '../../directives/only-number-input.directive';

@Component({
  selector: 'app-new-milestones',
  templateUrl: './new-milestones.component.html',
  styleUrls: ['./new-milestones.component.scss'],
  standalone: true,
  imports: [
    InputOnlyNumberDirective,

    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FlexLayoutModule,
    MaterialModule
  ],
})
export class NewMilestonesComponent {
  newMilestoneGroup!: FormGroup
  gmOptions: google.maps.MapOptions = {
    mapTypeId: '',
    center: null,
    zoom: 13,
    fullscreenControl: false,
    zoomControl: false
  };

  markerOptions = {
    draggable: true
  }
  constructor(
    public dialogRef: MatDialogRef<NewMilestonesComponent>,
    @Inject(MAT_DIALOG_DATA) public coordinatesIsSeleted: google.maps.LatLng,
    private formBuilder: FormBuilder
  ){

  }

  ngOnInit(){
    this.initForm();
    console.log(this.coordinatesIsSeleted);
    this.gmOptions.center = this.coordinatesIsSeleted;

  }

  private initForm(){
    this.newMilestoneGroup = this.formBuilder.group({
      numericalOrder: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      coordinates: this.formBuilder.group({
        lat: [this.coordinatesIsSeleted.lat(), Validators.required],
        lng: [this.coordinatesIsSeleted.lng(), Validators.required],
      })
    })
  }

  markerDraggend(event: google.maps.MapMouseEvent){
    const coordinatesControl = this.newMilestoneGroup.controls['coordinates'] as FormGroup;
    coordinatesControl.controls['lat'].setValue(event.latLng?.lat());
    coordinatesControl.controls['lng'].setValue(event.latLng?.lng());
  }

  submit(){
    console.log('submit is clicked');
    
    if(this.newMilestoneGroup.valid){

    }
  }
}
