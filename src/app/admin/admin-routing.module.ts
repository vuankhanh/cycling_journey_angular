import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'journey',
        loadChildren: ()=> import('./journey/journey.module').then(m=>m.JourneyModule)
      }, {
        path: 'album',
        loadChildren: ()=> import('./albums/albums.module').then(m=>m.AlbumModule)
      }, {
        path: '',
        redirectTo: 'journey',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
