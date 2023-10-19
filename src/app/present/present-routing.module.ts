import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentComponent } from './present.component';
// import { componentAreDestroyedGuard } from '../shared/core/guard/component-are-destroyed.guard';

const routes: Routes = [
  {
    path: '',
    component: PresentComponent,
    // canDeactivate: [componentAreDestroyedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentRoutingModule { }
