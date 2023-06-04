import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../core/material/material.module';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule
  ]
})

export class ModulesModule { }