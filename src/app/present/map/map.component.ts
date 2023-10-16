import { Component, Input, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker, MapPolyline } from '@angular/google-maps';
import { Observable, Subscription, concatMap, filter, from, map, of, scan, switchMap, tap, timer } from 'rxjs';
import { Milestone } from 'src/app/shared/models/Milestones';
import { ReadLocationJsonService } from 'src/app/shared/services/read-location-json.service';

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
  @ViewChild(GoogleMap, { static: true }) googleMap?: GoogleMap;
  @ViewChildren('milestoneMarker') mapMarkers?: QueryList<MapMarker>;
  @ViewChild('mainMarker') mapMainMarker?: MapMarker;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild(MapPolyline, { static: true }) mapPolyline!: MapPolyline;
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
    private readLocationJsonService: ReadLocationJsonService
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
  ngOnInit() {
    this.listenMapZoomChangedEvent();
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
        switchMap(_=>this.readLocationJsonService.get())
      ).subscribe(res=>{
        const polyLinePath = this.mapPolyline.polyline!.getPath();
        const responses: Array<string | google.maps.DirectionsResult> = res;
        for(let response of responses){
          this.polylineSetMap(polyLinePath, response as google.maps.DirectionsResult)
        }
        setTimeout(() => {
          this.mapMainMarker?.marker?.setMap(null);
        }, 10000);
      })
    )
  }

  private initDirections(map: google.maps.Map, start?: google.maps.LatLngLiteral, destination?: google.maps.LatLngLiteral): Promise<google.maps.DirectionsResult>{
    let rendererOptions = {
      map: map, // Bản đồ đích
      draggable: true, //Cho phép kéo map
      preserveViewport: true 
    };
    let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    let directionsService = new google.maps.DirectionsService();

    // directionsDisplay.setMap(map);
    let request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(start?.lat || NaN, start?.lng || NaN), //Điểm Start
      destination: new google.maps.LatLng(destination?.lat || NaN, destination?.lng || NaN), // Điểm Đích
      travelMode: google.maps.TravelMode.DRIVING, // Phương tiện giao thông
    };
    return new Promise((resolve, reject)=>{
      directionsService.route(request, function(response: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) {
        console.log(status);
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response)
          resolve(response as google.maps.DirectionsResult)
        }
        reject(status);
      });
    })
  }

  private initMarkers(milestones: Array<Milestone>) {
    this.milestoneMarkers$ = from(milestones).pipe(
      timed(200)
    );
    
    // this.initPolyline();
    // this.listenMarkerElementChange(milestones);

  }

  private listenMarkerElementChange(milestones: Array<Milestone>){
    this.subscription.add(
      this.mapMarkers?.changes.pipe(
        filter(markers=>markers.length === milestones.length)
      ).subscribe((res: QueryList<MapMarker>)=>{
        const markers = res.toArray();
        const arrSlectives = [];
          
        for(let [i, marker] of markers.entries()){
          if(markers[i+1]){
            const markerPosition = marker.getPosition()?.toJSON();
            const nextMarkerPosition = markers[i+1]?.getPosition()?.toJSON() || null;
            arrSlectives.push({
              origin: markerPosition,
              destination: nextMarkerPosition
            });
          }
        }
        
        this.loopGetResponseDirections(arrSlectives);
      })
    )
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

  private async loopGetResponseDirections(arrSlectives: Array<any>){
    const arrResponse: Array<google.maps.DirectionsResult | string> = [];
    for(let element of arrSlectives){
      try {
        const response = await this.initDirections(this.googleMap!.googleMap!, element.origin, element.destination);
        arrResponse.push(response);
      } catch (error) {
        arrResponse.push(error as string);
      }
    }
    console.log(arrResponse);
  }

  private polylineSetMap(polyline: google.maps.MVCArray<google.maps.LatLng>, response: google.maps.DirectionsResult){
    const legs: google.maps.DirectionsLeg[] = response.routes[0].legs;
    for(let i=0; i< legs.length; i++){
      const leg = legs[i];
      for(let j=0; j< leg.steps.length; j++){
        const steps = leg.steps[j];
        for(let k=0; k< steps.path.length; k++){
          const path = steps.path[k];
          const lat: number = path.lat as any;
          const lng: number = path.lng as any;
          const newCoordinates: google.maps.LatLng = new google.maps.LatLng(lat, lng);
          setTimeout(() => {
            polyline.push(newCoordinates);
            this.mapMainMarker?.marker?.setPosition(newCoordinates)
          }, 1);
        }
      }
    }
  }

  private delaySetPolyline(ms: number){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('');
      }, ms);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
