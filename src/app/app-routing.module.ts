import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: ()=> import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path: '',
    loadChildren: ()=> import('./present/present.module').then(m=>m.PresentModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
