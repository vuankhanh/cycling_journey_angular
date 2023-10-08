import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputOnlyNumberDirective } from '../../directives/only-number-input.directive';

import { MilestoneService } from '../../services/api/backend/milestone.service';

import { Subscription } from 'rxjs';

import * as _moment from 'moment';
import { Album } from '../../models/Album';
import { AlbumSelectionDialogBoxComponent } from '../album-selection-dialog-box/album-selection-dialog-box.component';

export const MY_FORMATS = {
  location: 'vi',
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'L',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'L',
  },
};

@Component({
  selector: 'app-new-milestones',
  templateUrl: './new-milestones.component.html',
  styleUrls: ['./new-milestones.component.scss'],
  standalone: true,
  imports: [
    InputOnlyNumberDirective,
    AlbumSelectionDialogBoxComponent,

    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FlexLayoutModule,
    MaterialModule,
    
  ],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS ],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VI' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class NewMilestonesComponent {
  newMilestoneGroup!: FormGroup;
  gmOptions: google.maps.MapOptions = {
    mapTypeId: '',
    center: null,
    zoom: 13,
    fullscreenControl: false,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false
  };

  markerOptions = {
    draggable: true
  }

  album?: Album;

  subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<NewMilestonesComponent>,
    @Inject(MAT_DIALOG_DATA) public coordinatesIsSeleted: google.maps.LatLng,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private milestoneService: MilestoneService
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
      dateTime: ['', Validators.required],
      coordinates: this.formBuilder.group({
        lat: [this.coordinatesIsSeleted.lat(), Validators.required],
        lng: [this.coordinatesIsSeleted.lng(), Validators.required],
      }),
      albumId: [null]
    })
  }

  chooseAlbum(){
    this.newMilestoneGroup.controls['albumId'].setValue('12222333');
    const dialogRef = this.dialog.open(AlbumSelectionDialogBoxComponent);

    this.subscription.add(
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: `);
        console.log(result);
        
        if(result){
          const albumIsSeleted: Album = result;
          this.album = albumIsSeleted;
          this.newMilestoneGroup.controls['albumId'].setValue(this.album._id);
        }
      })
    )
  }

  markerDraggend(event: google.maps.MapMouseEvent){
    const coordinatesControl = this.newMilestoneGroup.controls['coordinates'] as FormGroup;
    coordinatesControl.controls['lat'].setValue(event.latLng?.lat());
    coordinatesControl.controls['lng'].setValue(event.latLng?.lng());
  }

  submit(){
    console.log('submit is clicked');
    
    if(this.newMilestoneGroup.valid){
      console.log(this.newMilestoneGroup.value);
      this.subscription.add(
        this.milestoneService.create(this.newMilestoneGroup.value).subscribe(res=>{
          console.log('Tạo thành công');
          if(res.status === 201){
            this.dialogRef.close(res.metaData);
          }
        })
      )
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
