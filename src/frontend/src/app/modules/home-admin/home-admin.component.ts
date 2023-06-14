import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


import { usersListI } from './usersList.interface';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})

export class HomeAdminComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['username', 'name', 'surname', 'identification', 'email', 'delete'];
  users: usersListI[] = [];
  dataSource = new MatTableDataSource<usersListI>([]);
  apiRoot = 'https://pfc-production.up.railway.app';

  constructor(private router: Router, private http: HttpClient){}
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }
  
  ngOnInit(): void {
    
    if (sessionStorage.getItem('username') !== null && sessionStorage.getItem('id') !== null && sessionStorage.getItem('rol') !== null && sessionStorage.getItem('rol') != 'sub'){
      this.http
      .get<any>(this.apiRoot)
      .subscribe((response) => {
        this.users = response;
        this.dataSource.data = this.users;
      });
      
    } else {
      this.router.navigate(['/login']);
      alert('Lo siento. Para acceder a esta página tienes que estar logueado con un usuario administrador')
    }
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
      .delete<any>(this.apiRoot, options)
      .subscribe((response) => {
        console.log(response);
        if(response.message == "Usuario eliminado con éxito"){
          console.log('entrando en el if para redirect')
          location.reload();
        } else {
          alert("No se ha podido eliminar al usuario")
        }
      })
    }
  }
}