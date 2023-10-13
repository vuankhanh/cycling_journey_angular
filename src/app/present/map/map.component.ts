import { Component, Input, QueryList, SimpleChange, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, concatMap, from, map, of, scan, timer } from 'rxjs';
import { Milestone } from 'src/app/shared/models/Milestones';

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
@Component({
  selector: 'present-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input() milestones: Array<Milestone> = [];
  @Input() milestoneItemClicked?: Milestone;
  @ViewChild(GoogleMap, { static: true }) googleMap?: GoogleMap;
  @ViewChildren(MapMarker) mapMarkers?: QueryList<MapMarker>;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  milestoneMarkers$: Observable<Array<Milestone> | null> = of(null);
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

  infoWindowContent: boolean = false;

  constructor() { }

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
    if(this.googleMap){
      setTimeout(() => {
        this.initDirections(this.googleMap!.googleMap!, this.mapMarkers!.toArray()[0].getPosition()?.toJSON()!, this.mapMarkers!.toArray()[1].getPosition()?.toJSON()!)
        setTimeout(() => {
          this.initDirections(this.googleMap!.googleMap!, this.mapMarkers!.toArray()[2].getPosition()?.toJSON()!, this.mapMarkers!.toArray()[3].getPosition()?.toJSON()!)
        }, 500);
      }, 2000);
      this.googleMap?.zoomChanged.subscribe(res => {
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
  }

  private initDirections(map: google.maps.Map, start: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral){
    let rendererOptions = {
      map: map, // Bản đồ đích
      draggable: true, //Cho phép kéo map
      preserveViewport: true 
    };
    // let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    let directionsService = new google.maps.DirectionsService();

    // directionsDisplay.setMap(map);
    let request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(start.lat, start.lng), //Điểm Start
      destination: new google.maps.LatLng(destination.lat, destination.lng), // Điểm Đích
      travelMode: google.maps.TravelMode.DRIVING, // Phương tiện giao thông
    };
    directionsService.route(request, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        // new google.maps.DirectionsRenderer({
        //   map: map,
        //   directions: response,
        //   suppressMarkers: true // Xóa marker default
        // });
        console.log(response);
      }
    });
  }

  private initMarkers(milestones: Array<Milestone>) {
    this.milestoneMarkers$ = from(milestones).pipe(
      timed(200)
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
}
