import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit{
  registerDishForm: FormGroup;
  apiRoot = 'http://localhost:5000';
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
    console.log("Entrando en el método para obtener el usuario")
    
    let options = {
      headers: new HttpHeaders({
        'conten-type': 'application/json'
      }),
      body: {
        username: sessionStorage.getItem('username')
      }
    }

    console.log(options);

    this.http
    .get<any>(this.apiRoot, options)
    .subscribe((response) => {
      console.log(response);
      // sessionStorage.setItem('id', response._id);
    });
  }

  registerDish() {

    this.registerDishForm.value.photo = this.file.fileUrl;
    
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
    
    if(event.target.files && event.target.files.length > 0) {
      
      const file= event.target.files[0];
      
      if (file.type.includes("image")) {
        console.log("ENTRANDO EN EL IF PARA SUBIR LA IMAGEN")
        
        // Muestra la imagen cargada en el HTML
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function load(this: any) {
          
        }.bind(this)
  
        // this.file = file;
        
        // Sube la imagen al servidor
        const form = new FormData();

        form.append('name', file.name);
        form.append('file', file, 'form-data');

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