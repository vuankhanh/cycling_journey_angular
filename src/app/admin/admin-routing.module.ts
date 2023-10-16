import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { permissionGuard } from '../shared/core/guard/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'journey',
        loadChildren: ()=> import('./journey/journey.module').then(m=>m.JourneyModule),
        canActivate: [permissionGuard]
      }, {
        path: 'album',
        loadChildren: ()=> import('./albums/albums.module').then(m=>m.AlbumModule),
        canActivate: [permissionGuard]
      }, {
        path: 'login',
        component: LoginComponent
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
