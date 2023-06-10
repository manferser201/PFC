import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { HomeComponent } from './modules/home/home.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { LoginComponent } from './modules/login/login.component';
import { PostComponent } from './modules/post/post.component';
import { HomeAdminComponent } from './modules/home-admin/home-admin.component';

const routes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'post', component: PostComponent },
      { path: 'admin', component: HomeAdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
