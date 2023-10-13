import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums.component';
import { MediaComponent } from './media/media.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumsComponent
  },{
    path: ':media-route',
    component: MediaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
