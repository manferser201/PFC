import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent {
  registerDishForm: FormGroup;
  userData = sessionStorage.getItem('id');

  constructor(public fb:FormBuilder, private http: HttpClient, private router: Router) {
    this.registerDishForm = this.fb.group({
      photo: ['', Validators.required],
      name: ['', Validators.required],
      num_dishes: ['', Validators.required],
      type: ['', Validators.required],
      adress: ['', [Validators.required]],
      price: ['', [Validators.required]],
      ingredients: ['', Validators.required],
      description: [''],
      agent: this.userData
    });
  }

  registerDish() {

    console.log('url foto', this.registerDishForm.value.photo);
    console.log('datos', this.registerDishForm.value);
    this.http
      .post<any>('http://localhost:5000/dishes/', this.registerDishForm.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/']);
      }, (error) => {
        console.error(error)
      });
  }

  onReset(){
    console.log(this.userData);
  }

  obtenerUsuario() {
    console.log("Entrando en el método para obtener el usuario")
    
    let datosUsuario: string;
    
    this.http
    .get<any>('http://localhost:5000/userList')
    .subscribe((response) => {
      for (let index = 0; index < response.length; index++) {
        if(response[index].username == sessionStorage.getItem("username")){
          sessionStorage.setItem('id', response[index]._id);
        }
      }
    });
  }

  urlFoto() {
    
  }
}
