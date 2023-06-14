import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  apiRoot = 'https://pfc-production.up.railway.app';
  hide = true;

  constructor(public fb:FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  ngOnInit() {
    
  }

  login() {
    this.http
      .post<any>(`${this.apiRoot}/login`, this.loginForm.value)
      .subscribe((response) => {
        if(response.message == 'Autenticación exisota') {
          sessionStorage.setItem('username', this.loginForm.value.username);
          sessionStorage.setItem('id', response.id);
          sessionStorage.setItem('rol', response.rol);
          
          if (response.rol == "admin") {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }

        }
      }, (error) => {
        console.error(error)
      });
  }

  register(){
    this.router.navigate(['/register']);
  }



}
