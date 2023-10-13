import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentRoutingModule } from './present-routing.module';
import { PresentComponent } from './present.component';
import { MapComponent } from './map/map.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomInfoWindowModule } from '../shared/components/custom-info-window/custom-info-window.module';
import { MaterialModule } from '../shared/modules/material';


@NgModule({
  declarations: [
    PresentComponent,
    MapComponent,
    MilestonesComponent,
  ],
  imports: [
    CommonModule,
    PresentRoutingModule,

    MaterialModule,
    FlexLayoutModule,

    CustomInfoWindowModule,

    GoogleMapsModule
  ]
})
export class PresentModule { }
