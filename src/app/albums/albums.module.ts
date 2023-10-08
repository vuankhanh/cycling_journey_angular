import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './albums-routing.module';
import { MaterialModule } from '../shared/modules/material';

import { GalleryComponent } from '@daelmaak/ngx-gallery';

import { AlbumsComponent } from './albums.component';
import { AlbumComponent } from './album/album.component';
import { MediaComponent } from './media/media.component';
import { UploadComponent } from '../shared/components/upload/upload.component';

//pipes
import { SetBaseUrlPipe } from '../shared/pipes/set-base-url.pipe';
import { SharingPipesModule } from '../shared/pipes/sharing-pipes.module';


@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumComponent,
    MediaComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharingPipesModule,
    
    UploadComponent,
    
    GalleryComponent,

    AlbumRoutingModule
  ],
  providers: [
    SetBaseUrlPipe
  ]
})
export class AlbumModule { }
