import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MapsRoutingModule } from './journey-routing.module';
import { MaterialModule } from '../../shared/modules/material';

import { JourneyComponent } from './journey.component';
import { MapsComponent } from './maps/maps.component';
import { NewMilestonesComponent } from '../../shared/components/new-milestones/new-milestones.component';
import { MilestonesComponent } from './milestones/milestones.component';

//directives
import { DisableDefaultRightMouseClickDirective } from '../../shared/directives/disable-default-right-mouse-click.directive';

//pipes
import { SharingPipesModule } from '../../shared/pipes/sharing-pipes.module';
import { SetBaseUrlPipe } from '../../shared/pipes/set-base-url.pipe';
import { GalleryComponent } from '@daelmaak/ngx-gallery';
import { CustomInfoWindowModule } from 'src/app/shared/components/custom-info-window/custom-info-window.module';


@NgModule({
  declarations: [
    //componets
    JourneyComponent,
    MapsComponent,
    MilestonesComponent,

    //directives
    DisableDefaultRightMouseClickDirective,
    // InputOnlyNumberDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule,
    MapsRoutingModule,
    MaterialModule,

    GoogleMapsModule,
    FlexLayoutModule,

    GalleryComponent,

    CustomInfoWindowModule,
    
    //stand alone component
    NewMilestonesComponent,

    //Sharing pipes
    SharingPipesModule
  ],
  providers: [SetBaseUrlPipe]
})
export class JourneyModule { }
