import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MapsRoutingModule } from './maps-routing.module';
import { MaterialModule } from '../shared/modules/material';

import { MapsComponent } from './maps.component';
import { NewMilestonesComponent } from '../shared/components/new-milestones/new-milestones.component';
import { MilestonesComponent } from '../shared/components/milestones/milestones.component';
import { DisableDefaultRightMouseClickDirective } from '../shared/directives/disable-default-right-mouse-click.directive';


@NgModule({
  declarations: [
    //componets
    MapsComponent,
    MilestonesComponent,

    //directives
    DisableDefaultRightMouseClickDirective
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    MapsRoutingModule,
    MaterialModule,

    GoogleMapsModule,
    FlexLayoutModule,

    //stand alone component
    NewMilestonesComponent
  ]
})
export class MapsModule { }
