import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../modules/material';
import { GoogleMapsModule } from '@angular/google-maps';
import { InputOnlyNumberDirective } from '../../directives/only-number-input.directive';

import { MilestoneService } from '../../services/api/backend/milestone.service';

import { Subscription } from 'rxjs';

import * as _moment from 'moment';
import { Album } from '../../models/Album';
import { AlbumSelectionDialogBoxComponent } from '../album-selection-dialog-box/album-selection-dialog-box.component';
import { Milestone } from '../../models/Milestones';
import { AlbumService, DetailParams } from '../../services/api/backend/album.service';

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
    @Inject(MAT_DIALOG_DATA) public data: MilestoneData,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private milestoneService: MilestoneService,
    private albumService: AlbumService
  ){

  }

  ngOnInit(){
    this.initForm();
    this.gmOptions.center = this.data.data.coordinates;
  }

  private initForm(){
    this.newMilestoneGroup = this.formBuilder.group({
      numericalOrder: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      dateTime: ['', Validators.required],
      coordinates: this.formBuilder.group({
        lat: ['', Validators.required],
        lng: ['', Validators.required],
      }),
      albumId: [null]
    });

    this.newMilestoneGroup.patchValue(this.data.data);
    if(typeof this.data.data.albumId === 'string'){
      this.getAlbumDetail(this.data.data.albumId);
    }
  }

  private getAlbumDetail(id: string){
    const detailParams: DetailParams = { id };
    this.subscription.add(
      this.albumService.getDetail(detailParams).subscribe(res=>{
        if(res.status === 200){
          this.album = res.metaData;
        }
      })
    )
  }

  chooseAlbum(){
    const dialogRef = this.dialog.open(AlbumSelectionDialogBoxComponent);

    this.subscription.add(
      dialogRef.afterClosed().subscribe(result => {
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

  keyDownFunction(event: any) {
    console.log(event);
    
    if (event.keyCode === 13) {
      alert('you just pressed the enter key');
      // rest of your code
    }
  }

  submit(){
    this.data.state === 'update' ? this.update() : this.create();
  }

  update(){
    if(this.newMilestoneGroup.valid){
      this.subscription.add(
        this.milestoneService.modify(this.data.data._id, this.newMilestoneGroup.value).subscribe(res=>{
          if(res.status === 200){
            this.dialogRef.close(res.metaData);
          }
        })
      )
    }
  }

  create(){
    if(this.newMilestoneGroup.valid){
      console.log(this.newMilestoneGroup.value);
      this.subscription.add(
        this.milestoneService.create(this.newMilestoneGroup.value).subscribe(res=>{
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

export interface MilestoneData{
  state: 'new' | 'update',
  data: Milestone
}