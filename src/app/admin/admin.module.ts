import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { MaterialModule } from '../shared/modules/material';
import { LoginComponent } from './login/login.component';
import { NuclearSuitcaseComponent } from './nuclear-suitcase/nuclear-suitcase.component';


@NgModule({
  declarations: [
    AdminComponent,
    NuclearSuitcaseComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    MaterialModule,

    LoginComponent,
  ]
})
export class AdminModule { }
