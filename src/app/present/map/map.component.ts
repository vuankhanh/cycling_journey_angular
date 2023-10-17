import { Component, ElementRef, EventEmitter, Input, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker, MapPolyline } from '@angular/google-maps';
import { Observable, Subscription, concatMap, filter, from, map, scan, switchMap, timer } from 'rxjs';
import { Coordinates } from 'src/app/shared/models/GoogleMap';
import { Milestone } from 'src/app/shared/models/Milestones';
import { Polyline } from 'src/app/shared/models/Polyline';
import { PolylineService } from 'src/app/shared/services/api/backend/polyline.service';

const timeOf = (interval: number) => <T>(val: T) =>
  timer(interval).pipe(map(x => val));

const timed = (interval: number) => <T>(source: Observable<T>) =>
  source.pipe(
    concatMap(timeOf(interval)),
    map(x => [x]),
    scan((acc, val) => [...acc, ...val]),
  )
const centerMap: google.maps.LatLngLiteral = {
  lat: 16.48933704291298,
  lng: 105.21755197595763
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
  @Output() menuToggleEmit: EventEmitter<any> = new EventEmitter();
  @ViewChild(GoogleMap, { static: true }) googleMap?: GoogleMap;
  @ViewChildren('milestoneMarker') mapMarkers?: QueryList<MapMarker>;
  @ViewChild('mainMarker') mapMainMarker?: MapMarker;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild(MapPolyline, { static: true }) mapPolyline!: MapPolyline;
  @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;
  milestoneMarkers$!: Observable<Array<Milestone>>;
  milestoneMarker?: Milestone = undefined;
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
    strokeColor: 'green',
  }

  sMkOptions: google.maps.MarkerOptions = {
    icon: specialImgMkIcon,
    zIndex: 10
  }

  infoWindowContent: boolean = false;

  subscription: Subscription = new Subscription();
  constructor(
    private polylineService: PolylineService
  ) { }

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
    console.log(this.menuButton);
    this.addCustomControl();
  }
  ngOnInit() {
    this.listenMapZoomChangedEvent();
  }

  private addCustomControl(){
    this.googleMap?.controls[google.maps.ControlPosition.TOP_CENTER].push(this.menuButton.nativeElement)
  }

  openMenu(){
    console.log('toggle...');
    
    this.menuToggleEmit.emit('something...');
  }

  private createCenterControl() {
    const controlButton = document.createElement('button');
  
    // Set CSS for the control.
    controlButton.style.backgroundColor = '#fff';
    controlButton.style.border = '2px solid #fff';
    controlButton.style.borderRadius = '3px';
    controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlButton.style.color = 'rgb(25,25,25)';
    controlButton.style.cursor = 'pointer';
    controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlButton.style.fontSize = '16px';
    controlButton.style.lineHeight = '38px';
    controlButton.style.margin = '8px 0 22px';
    controlButton.style.padding = '0 5px';
    controlButton.style.textAlign = 'center';
  
    controlButton.textContent = 'Center Map';
    controlButton.title = 'Click to recenter the map';
    controlButton.type = 'button';
  
    return controlButton;
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

    this.infoWindow.open(marker);
    this.infoWindowContent = true;
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
    for(let i=0; i< polylines.length; i++){
      const element = polylines[i];
      for(let j=0; j< element.length; j++){
        const path = element[j];
        const newCoordinates: google.maps.LatLng = new google.maps.LatLng(path.lat, path.lng);
        setTimeout(() => {
          polyline.push(newCoordinates);
          this.mapMainMarker?.marker?.setPosition(newCoordinates)
        }, 1);
      }
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
