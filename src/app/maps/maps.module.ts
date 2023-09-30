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

//directives
import { DisableDefaultRightMouseClickDirective } from '../shared/directives/disable-default-right-mouse-click.directive';
// import { InputOnlyNumberDirective } from '../shared/directives/only-number-input.directive';


@NgModule({
  declarations: [
    //componets
    MapsComponent,
    MilestonesComponent,

    //directives
    DisableDefaultRightMouseClickDirective,
    // InputOnlyNumberDirective
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
