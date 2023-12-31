import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomInfoWindowComponent } from './custom-info-window.component';
import { GalleryComponent } from '@daelmaak/ngx-gallery';
import { MaterialModule } from '../../modules/material';
import { SharingPipesModule } from '../../pipes/sharing-pipes.module';
import { SetBaseUrlPipe } from '../../pipes/set-base-url.pipe';
import { SlidesComponent } from '../slides/slides.component';



@NgModule({
  declarations: [
    CustomInfoWindowComponent
  ],
  imports: [
    CommonModule,
    GalleryComponent,
    MaterialModule,
    SlidesComponent,

    //Sharing pipes
    SharingPipesModule,
  ],
  providers: [
    SetBaseUrlPipe
  ],
  exports: [
    CustomInfoWindowComponent
  ]
})
export class CustomInfoWindowModule { }
