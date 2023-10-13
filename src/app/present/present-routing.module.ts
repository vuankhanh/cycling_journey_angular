import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentComponent } from './present.component';

const routes: Routes = [
  {
    path: '',
    component: PresentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentRoutingModule { }
