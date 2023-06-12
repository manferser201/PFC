import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { usersI } from './users.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent {
  registerDishForm: FormGroup;
  apiRoot = 'https://pfc-production.up.railway.app';
  file: any;

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
      agent: sessionStorage.getItem('id')
    });
  }
  
  ngOnInit(): void {
    
  }

  registerDish() {

    // Modificamos el valor por la nueva ruta obtenida del servidor
    this.registerDishForm.value.photo = this.file.fileUrl;

    // Mandamos los datos al servidor mediante el método post
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

  }

  urlFoto(event: any) {
    
    if(event.target.files && event.target.files.length > 0) {
      
      const file= event.target.files[0];

      console.log("archivo:", file);
      
      if (file.type.includes("image")) {
        console.log("ENTRANDO EN EL IF PARA SUBIR LA IMAGEN")
        
        // Muestra la imagen cargada en el HTML
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function load(this: any) {
          
        }.bind(this)
        
        // Sube la imagen al servidor
        const form = new FormData();

        form.append('name', file.name);
        form.append('file', file, 'form-data');

        console.log("Crea el formulario que le vamos a pasar: ", form);

        this.http.post(`${this.apiRoot}/images/upload`, form)
        .subscribe((response) => {
          this.file = response;
        })
      } else {
        console.error("THERE WAS AN ERROR")
      }

    }
  }

}