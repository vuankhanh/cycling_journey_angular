import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import { UploadComponent } from './upload/upload.component';
import { ShowsComponent } from './shows/shows.component';


@NgModule({
  declarations: [
    AlbumsComponent,
    UploadComponent,
    ShowsComponent,
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule
  ]
})
export class AlbumModule { }
