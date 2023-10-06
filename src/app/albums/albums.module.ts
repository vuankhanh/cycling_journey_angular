import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './albums-routing.module';
import { MaterialModule } from '../shared/modules/material';

import { GalleryComponent } from '@daelmaak/ngx-gallery';

import { AlbumsComponent } from './albums.component';
import { UploadComponent } from './upload/upload.component';
import { ShowsComponent } from './shows/shows.component';
import { AlbumComponent } from './album/album.component';

//pipes
import { SetBaseUrlPipe } from '../shared/pipes/set-base-url.pipe';
import { MediaComponent } from './media/media.component';


@NgModule({
  declarations: [
    AlbumsComponent,
    UploadComponent,
    ShowsComponent,
    AlbumComponent,

    //pipes
    SetBaseUrlPipe,
    MediaComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    
    GalleryComponent,

    AlbumRoutingModule
  ],
  providers: [
    SetBaseUrlPipe
  ]
})
export class AlbumModule { }
