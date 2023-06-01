import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ]
})

export class ModulesModule { }