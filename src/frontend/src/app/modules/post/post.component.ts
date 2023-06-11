import { Component} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  apiRoot = 'http://localhost:5000';

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

  obtenerUsuario() {
    console.log("Entrando en el método para obtener el usuario")
    
    let options = {
      headers: new HttpHeaders({
        'conten-type': 'application/json'
      }),
      body: {
        username: sessionStorage.getItem('username')
      }
    }

    this.http
    .get<any>(this.apiRoot, options)
    .subscribe((response) => {
      sessionStorage.setItem('id', response._id);
    });
  }

  registerDish() {

    console.log('url foto', this.registerDishForm.value.photo);
    console.log('datos', this.registerDishForm.value);
    
    this.http
      .post<any>(`${this.apiRoot}/dishes`, this.registerDishForm.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/']);
      }, (error) => {
        console.error(error)
      });
  }

  onReset(){
    console.log(this.registerDishForm.value.photo);
  }

  urlFoto(event: any) {
    const file= event.target.files[0];

    console.log(file);

    if (file) {
      console.log("ENTRANDO EN EL IF PARA SUBIR LA IMAGEN")
      this.http.post('PFC/src/frontend/src/assets/image/', file);
    }

    console.log("IMAGEN SUBIDA");
  }

}
