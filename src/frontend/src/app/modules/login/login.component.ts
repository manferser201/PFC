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

  constructor(public fb:FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  login() {
    this.http
      .post<any>('http://localhost:5000/login', this.loginForm.value)
      .subscribe((response) => {
        if(response.message == 'Autenticación exisota') {
          sessionStorage.setItem('username', this.loginForm.value.username);
          sessionStorage.setItem('password', this.loginForm.value.password);
        }
      }, (error) => {
        console.error(error)
      });
  }

  ngOnInit() {}

}
