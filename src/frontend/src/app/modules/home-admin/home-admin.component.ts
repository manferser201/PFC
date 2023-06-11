import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { usersListI } from './users.interface';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})

export class HomeAdminComponent implements OnInit{

  users: usersListI[] = [];
  apiRoot = 'http://localhost:5000';

  constructor(private router: Router, private http: HttpClient){}
  
  ngOnInit(): void {
    this.http
    .get<any>(`${this.apiRoot}/userList`)
    .subscribe((response) => {
      this.users = response;
    });
  }

  deleteUser(usernameDelete: string) {
    
    let res = window.confirm(`¿ESTÁS SEGUR@ DE QUE QUIERE ELIMINAR AL USUARIO ${usernameDelete} DE LA APLICACIÓN?`);

    if(res === true){
      const options = {
        headers: new HttpHeaders({
          'conten-type': 'application/json'
        }),
        body: {
          username: usernameDelete
        }
      }
  
      this.http
      .delete<usersListI>(this.apiRoot, options)
      .subscribe((response) => {
        window.location.reload();
        console.log(response);
      })
    }
  }
}