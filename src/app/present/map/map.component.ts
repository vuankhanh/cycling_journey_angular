import { Component, Input, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
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
@Component({
  selector: 'present-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input() milestones: Array<Milestone> = [];
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  milestoneMarkers$: Observable<Array<Milestone> | null> = of(null);
  milestoneMarker?: Milestone = undefined;
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
    icon: this.imgMkIcon,
    animation: google.maps.Animation.DROP
  }

  infoWindowContent: boolean = false;

  constructor(){}

  ngOnChanges(changes: SimpleChanges){
    console.log(changes['milestones'].currentValue);
    const milestones = changes['milestones'].currentValue;
    if(milestones){
      this.initMarkers(milestones);
    }
  }
  ngOnInit(){
    
    console.log(this.milestones);
    
  }

  private initMarkers(milestones: Array<Milestone>){
    this.milestoneMarkers$ = from(milestones).pipe(
      timed(200)
    )
  }

  openInfoWindow(marker: MapMarker, milestone: Milestone) {
    console.log(marker.marker);
    this.milestoneMarker = milestone;
    
    this.infoWindow.open(marker);
    this.infoWindowContent = true;
  }

  closeInfoWindow(){
    this.infoWindowContent = false;
  }
}
