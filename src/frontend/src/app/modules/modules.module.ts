import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})

export class ModulesModule { }