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
  
  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit(): void {

    if (sessionStorage.getItem('username') !== null && sessionStorage.getItem('id') !== null){
      
      // Obtenemos el listado de todos lo platos que existen
      this.http
      .get<any>(`${this.apiRoot}/dishes/dishesList`)
      .subscribe((response) => {
        console.log(response);
        this.dishes = response;
      });

      // Obtenemos el listado de todas las imágenes que existen
      this.http
      .get<any>(`${this.apiRoot}/images`)
      .subscribe((response) => {
        console.log(response);
        this.images = response;
      });

    } else {
      this.router.navigate(['/login']);
    }
  }
}