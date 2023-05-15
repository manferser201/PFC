import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from "../core/core.module";

@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ]
})

export class ModulesModule { }