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

      if (screen.width < 1000){
        this.dataTable_small();
      } else {
        this.dataTable();
      }
      
    } else {
      this.router.navigate(['/login']);
      alert('Lo siento. Para acceder a esta página tienes que estar logueado con un usuario administrador')
    }
  }

  dataTable(){
    let table = document.getElementById('dataTable');

    const template =
    `'<ng-container matColumnDef="username">
      <th mat-header-cell *matHeaderCellDef>NOMBRE DE USUARO</th>
      <td mat-cell *matCellDef="let element"> {{ element.username }} </td>
    </ng-container>


    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> NOMBRE </th>
      <td mat-cell *matCellDef="let element"> {{ element.name }} </td>
    </ng-container>


    <ng-container matColumnDef="surname">
      <th mat-header-cell *matHeaderCellDef> APELLIDOS </th>
      <td mat-cell *matCellDef="let element"> {{ element.surname }} </td>
    </ng-container>


    <ng-container matColumnDef="identification">
      <th mat-header-cell *matHeaderCellDef> DNI/NIE </th>
      <td mat-cell *matCellDef="let element"> {{ element.identification }} </td>
    </ng-container>


    <ng-container matColumnDef="email">
      <th mat-header-cell *matHeaderCellDef> CORREO ELECTRONICO </th>
      <td mat-cell *matCellDef="let element"> {{ element.email }} </td>
    </ng-container>

    <ng-container matColumnDef="delete">
      <th mat-header-cell *matHeaderCellDef> ELIMINAR </th>
      <td mat-cell *matCellDef="let element" (click)="deleteUser(element.username)"><mat-icon class="icon" fontIcon="close"></mat-icon></td>
    </ng-container>'`;


    document.getElementById('dataTable')!.innerHTML = template;
  }

  dataTable_small(){

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