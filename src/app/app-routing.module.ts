import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'maps',
    loadChildren: ()=> import('./maps/maps.module').then(m=>m.MapsModule)
  },
  {
    path: 'albums',
    loadChildren: ()=> import('./albums/albums.module').then(m=>m.AlbumModule)
  },
  {
    path: '',
    redirectTo: 'maps',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
