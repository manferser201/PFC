import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { dishesList } from './dishesList.interface';
import { Dish } from './dish.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  dishes: Dish[] = [];
  images = [];
  apiRoot = 'https://pfc-production.up.railway.app';
  
  constructor(private router: Router, private http: HttpClient) {}

  dish1 = new Dish('tortilla2.jfif','Tortilla de patatas', 'Patatas, Huevo, Aceite, Sal', 1.5, 3, 'Plato de patatas casero');
  dish2 = new Dish('tortilla.jfif','Tortilla de patatas', 'Patatas, Huevo, Aceite, Sal', 1.5, 3, 'Plato de patatas casero');
  dish3 = new Dish('tortilla2.jfif','Tortilla de patatas', 'Patatas, Huevo, Aceite, Sal', 1.5, 3, 'Plato de patatas casero');
  dish4 = new Dish('tortilla2.jfif','Tortilla de patatas', 'Patatas, Huevo, Aceite, Sal', 1.5, 3, 'Plato de patatas casero');
  
  ngOnInit(): void {

    if (sessionStorage.getItem('username') !== null && sessionStorage.getItem('id') !== null && sessionStorage.getItem('rol') !== null && sessionStorage.getItem('rol') != 'admin'){
      
      // // Obtenemos el listado de todos lo platos que existen
      // this.http
      // .get<any>(`${this.apiRoot}/dishes/dishesList`)
      // .subscribe((response) => {
      //   console.log(response);
      //   this.dishes = response;
      // });

      // // Obtenemos el listado de todas las imágenes que existen
      // this.http
      // .get<any>(`${this.apiRoot}/images`)
      // .subscribe((response) => {
      //   console.log(response);
      //   this.images = response;
      // });

      this.dishes.push(this.dish1);
      this.dishes.push(this.dish2);
      this.dishes.push(this.dish3);
      this.dishes.push(this.dish4);

    } else {
      alert('Lo siento. Para acceder a esta página tienes que estar logueado con un usuario normal')
      this.router.navigate(['/login']);
    }
  }
}