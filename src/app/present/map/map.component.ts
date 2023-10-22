import { Component, ElementRef, EventEmitter, Input, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker, MapPolyline } from '@angular/google-maps';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { GalleryComponent } from '@daelmaak/ngx-gallery';
import { Observable, Subscription, concatMap, filter, from, map, scan, switchMap, take, timer } from 'rxjs';
import { Coordinates } from 'src/app/shared/models/GoogleMap';
import { Milestone } from 'src/app/shared/models/Milestones';
import { Polyline } from 'src/app/shared/models/Polyline';
import { PolylineService } from 'src/app/shared/services/api/backend/polyline.service';
import { BreakpointDetectionService } from 'src/app/shared/services/breakpoint-detection.service';

const timeOf = (interval: number) => <T>(val: T) =>
  timer(interval).pipe(map(x => val));

const timed = (interval: number) => <T>(source: Observable<T>) =>
  source.pipe(
    concatMap(timeOf(interval)),
    map(x => [x]),
    scan((acc, val) => [...acc, ...val]),
  )
const centerMap: google.maps.LatLngLiteral = {
  lat: 16.299623680846395,
  lng: 105.57691501549118
};

const normalImgMkIcon: google.maps.Icon = {
  url: '/assets/imgs/png/marker.png',
  size: new google.maps.Size(25, 37),
  scaledSize: new google.maps.Size(25, 37)
}

const bigImgMkIcon: google.maps.Icon = {
  url: '/assets/imgs/png/marker.png',
  size: new google.maps.Size(50, 72),
  scaledSize: new google.maps.Size(50, 72)
}

const specialImgMkIcon: google.maps.Icon = {
  url: '/assets/imgs/png/touring_bicycle.png',
  size: new google.maps.Size(81, 45.3),
  scaledSize: new google.maps.Size(81, 45.3)
}
@Component({
  selector: 'present-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input() milestones: Array<Milestone> = [];
  @Input() milestoneItemClicked?: Milestone;
  @Output() milestonesToggleEmit: EventEmitter<any> = new EventEmitter();
  @ViewChild(GoogleMap, { static: true }) googleMap?: GoogleMap;
  @ViewChildren('milestoneMarker') mapMarkers?: QueryList<MapMarker>;
  @ViewChild('mainMarker') mapMainMarker?: MapMarker;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild(MapPolyline, { static: true }) mapPolyline!: MapPolyline;
  @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('infoWindowTemp') infoWindowTemp!: TemplateRef<any>;

  breakpointDetection$: Observable<boolean>;
  milestoneMarkers$!: Observable<Array<Milestone>>;
  milestoneMarker?: Milestone = undefined;
  galleryConfig: GalleryComponent = new GalleryComponent();
  gmOptions: google.maps.MapOptions = {
    mapTypeId: '',
    center: centerMap,
    zoom: 6
  };

  mkOptions: google.maps.MarkerOptions = {
    icon: normalImgMkIcon,
    animation: google.maps.Animation.DROP
  }

  iwOptions: google.maps.InfoWindowOptions = {
    maxWidth: 1920,
  }

  mpOptions: google.maps.PolylineOptions = {
    strokeColor: '#00b0ff',
    strokeWeight: 5
  }

  sMkOptions: google.maps.MarkerOptions = {
    icon: specialImgMkIcon,
    zIndex: 10
  }

  infoWindowContent: boolean = false;

  private subscription: Subscription = new Subscription();
  constructor(
    private matDialog: MatDialog,
    private matBottomSheet: MatBottomSheet,
    private breakpointDetectionService: BreakpointDetectionService,
    private polylineService: PolylineService
  ) {
    this.breakpointDetection$ = this.breakpointDetectionService.detection$()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['milestones']) {
      const milestones: Array<Milestone> = changes['milestones'].currentValue;
      this.initMarkers(milestones);
    }

    if(changes['milestoneItemClicked']){
      const milestoneItemClicked: Milestone = changes['milestoneItemClicked']?.currentValue;
      this.findMarkerForInfowindow(milestoneItemClicked)
    }
  }

  ngAfterViewInit(){
    this.addCustomControl();
  }

  ngOnInit() {
    this.listenMapZoomChangedEvent();
  }

  private addCustomControl(){
    this.googleMap?.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.menuButton.nativeElement)
  }

  openMenu(){
    this.milestonesToggleEmit.emit(null);
  }

  private listenMapZoomChangedEvent(){
    this.googleMap?.zoomChanged.subscribe(_ => {
      const zoomIndex = this.googleMap?.getZoom();
      if (zoomIndex != undefined) {
        if (zoomIndex >= 9) {
          if (this.mapMarkers?.length === this.milestones.length) {
            this.mapMarkers!.toArray().forEach(marker => {
              this.setImgMkIcon(marker, bigImgMkIcon);
            });
          }
        }
        if (zoomIndex <= 7) {
          if (this.mapMarkers?.length === this.milestones.length) {
            this.mapMarkers!.toArray().forEach(marker => {
              this.setImgMkIcon(marker, normalImgMkIcon);
            });
          }
        }
      }
    });
  }

  private initPolyline(){
    this.subscription.add(
      this.mapMarkers?.changes.pipe(
        filter(markers=>markers.length === this.milestones.length),
        switchMap(_=>this.polylineService.get())
      ).subscribe(res=>{
        const polyLinePath = this.mapPolyline.polyline!.getPath();
        const metaData: Polyline = res.metaData;

        this.polylineSetMap(polyLinePath, metaData.polylines)

        setTimeout(() => {
          this.mapMainMarker?.marker?.setMap(null);
        }, 10000);
      })
    )
  }

  private initMarkers(milestones: Array<Milestone>) {
    this.milestoneMarkers$ = from(milestones).pipe(
      timed(200)
    );
    
    this.initPolyline();

  }

  openInfoWindow(marker: MapMarker, milestone: Milestone) {
    this.milestoneMarker = milestone;
    
    this.infoWindowContent = true;
    this.subscription.add(
      this.breakpointDetection$.pipe(
        take(1)
        ).subscribe(isMobile=>{
          if(isMobile){
          marker.marker?.setAnimation(google.maps.Animation.BOUNCE);
          this.googleMap?.googleMap?.setCenter(marker.getPosition()!);
          this.galleryConfig.thumbs = false;
          const infoWinfowBottomSheet = this.matBottomSheet.open(this.infoWindowTemp!, {
            panelClass: 'custom-info-window'
          });
          this.subscription.add(
            infoWinfowBottomSheet.afterDismissed().pipe(
              take(1)
            ).subscribe(_=>{
              marker.marker?.setAnimation(null);
            })
          )
        }else{
          this.infoWindow.open(marker);
        }
      })
    )
  }

  closeInfoWindow() {
    this.infoWindowContent = false;
  }

  private setImgMkIcon(mapMarker: MapMarker, imgMkIcon: google.maps.Icon) {
    mapMarker.marker?.setIcon(imgMkIcon)
  }

  private findMarkerForInfowindow(milestone: Milestone){
    if (this.mapMarkers?.length === this.milestones.length) {
      this.mapMarkers!.toArray().forEach(marker => {
        const title = parseInt(marker.getTitle() || '');
        if(title == milestone.numericalOrder){
          this.openInfoWindow(marker, milestone);
        }
      });
    }
  }

  private polylineSetMap(polyline: google.maps.MVCArray<google.maps.LatLng>, polylines: Array<Array<Coordinates>>){
    let i: number = 0;
    let $this = this;
    const myLoop = (ms: number=500)=>{      
      setTimeout(function() {
        const element = polylines[i];
        for(let j=0; j< element.length; j++){
          const path = element[j];
          const newCoordinates: google.maps.LatLng = new google.maps.LatLng(path.lat, path.lng);
            polyline.push(newCoordinates);
            $this.mapMainMarker?.marker?.setPosition(newCoordinates)
        }
        i++;
        if (i < polylines.length) {
          myLoop();
        }
      }, ms)
    }
    myLoop();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
