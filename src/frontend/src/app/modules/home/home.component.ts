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

  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.http
    .get<any>('http://localhost:5000/dishes/dishesList')
    .subscribe((response) => {
      console.log(response);
      this.dishes = response;
    });
  }

}
