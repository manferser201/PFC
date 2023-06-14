import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { dishesList } from './dishesList.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  dishes: dishesList[] = [];
  images = [];
  apiRoot = 'https://pfc-production.up.railway.app';
  // apiRoot = 'http://localhost:5000';
  
  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit(): void {

    if (sessionStorage.getItem('username') !== null && sessionStorage.getItem('id') !== null && sessionStorage.getItem('rol') !== null && sessionStorage.getItem('rol') != 'admin'){
      
      // Obtenemos el listado de todos lo platos que existen
      this.http
      .get<any>(`${this.apiRoot}/dishes/dishesList`)
      .subscribe((response) => {
        console.log("respuesta get: ", response);
        this.dishes = response;
      });

    } else {
      alert('Lo siento. Para acceder a esta página tienes que estar logueado con un usuario normal')
      this.router.navigate(['/login']);
    }
  }
}