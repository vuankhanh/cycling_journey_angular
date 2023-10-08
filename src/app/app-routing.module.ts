import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'journey',
    loadChildren: ()=> import('./journey/journey.module').then(m=>m.JourneyModule)
  },
  {
    path: 'albums',
    loadChildren: ()=> import('./albums/albums.module').then(m=>m.AlbumModule)
  },
  {
    path: '',
    redirectTo: 'journey',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
