import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit{

  registerForm: FormGroup;

  constructor(public fb:FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8), Validators.required]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      identification: ['', Validators.required],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  register() {

    this.http
      .post<any>('http://localhost:5000', this.registerForm.value)
      .subscribe((response) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.error(error)
      });
  }

  ngOnInit() { }
}