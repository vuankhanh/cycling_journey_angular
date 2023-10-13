import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { MilestoneData, NewMilestonesComponent } from '../../../shared/components/new-milestones/new-milestones.component';
import { Milestone } from 'src/app/shared/models/Milestones';
import { Subscription } from 'rxjs';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { GalleryItem } from '@daelmaak/ngx-gallery';

const centerMap: google.maps.LatLngLiteral = {
  lat: 16.48933704291298,
  lng: 105.21755197595763
};

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent {
  @Input() milestones: Array<Milestone> = [];
  @Output() newMilestone = new EventEmitter<Milestone>();
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('contextMenu') contextMenu!: TemplateRef<any>;

  milestoneMarker?: Milestone = undefined;
  galleryItems: GalleryItem[] = [];
  subscription: Subscription = new Subscription();
  display: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };

  gmOptions: google.maps.MapOptions = {
    mapTypeId: '',
    center: centerMap,
    zoom: 6
  };

  imgMkIcon = {
    url: '/assets/imgs/png/marker.png',
    size: new google.maps.Size(25, 37),
    scaledSize: new google.maps.Size(25, 37)
  }
  mkOptions: google.maps.MarkerOptions = {
    icon: this.imgMkIcon
  }

  infoWindowContent: boolean = false;

  overlayRef?: OverlayRef;

  constructor(
    public overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
  }

  mapRightMouseClick(event: google.maps.MapMouseEvent) {
    const domEvent: MouseEvent = event.domEvent as MouseEvent;

    if (event.latLng != null) {
      const latLng = event.latLng as google.maps.LatLng;
      this.display = event.latLng.toJSON();
      setTimeout(() => {
        this.openFusilliPanel(domEvent, latLng)
      }, 0);
    }
  }

  openInfoWindow(marker: MapMarker, milestone: Milestone) {
    this.milestoneMarker = milestone;
    
    this.infoWindow.open(marker);
    this.infoWindowContent = true;
  }

  closeInfoWindow(){
    this.infoWindowContent = false;
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }

  openFusilliPanel({clientX, clientY}: MouseEvent, coordinates: google.maps.LatLng) {
    this.closeFusilliPanel();
    let config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
      .global()
      .top(`${clientY}px`)
      .left(`${clientX}px`);
    config.hasBackdrop = true;
    config.backdropClass = 'cdk-overlay-transparent-backdrop';

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(new TemplatePortal(this.contextMenu, this.viewContainerRef, {
      $implicit: coordinates
    }));
    this.subscription.add(
      this.overlayRef.backdropClick().subscribe(e=>{
        this.closeFusilliPanel();
      })
    )
  }

  private closeFusilliPanel() {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  addNewStone(coordinates: google.maps.LatLng){
    const milestone = {
      coordinates
    }
    const milestoneData: MilestoneData = {
      state: 'new',
      data: milestone as Milestone
    }
    this.closeFusilliPanel();
    const dialogRef = this.dialog.open(NewMilestonesComponent, {
      data: milestoneData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        const newMilestone: Milestone = result;
        this.newMilestone.emit(newMilestone);
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
