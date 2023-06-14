import { Component, OnInit} from '@angular/core';
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
  apiRoot = 'https://pfc-production.up.railway.app';
  // apiRoot = 'http://localhost:5000';
  file: any;
  image: any = "./assets/image/upload.png"

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
    if (sessionStorage.getItem('username') == null || sessionStorage.getItem('id') == null || sessionStorage.getItem('rol') == null || sessionStorage.getItem('rol') == 'admin'){
      
      this.router.navigate(['/login']);
      alert('Lo siento. Para acceder a esta página tienes que estar logueado con un usuario normal');
      
    }
  }

  public GetFileOnLoad(event: any) {
    const file = event.target.files[0];
    let element = document.getElementById("fakeFileInput") as HTMLInputElement | null;
    if(element != null) {
      element.value = file?.name;
    }

    if(event.target.files && event.target.files.length > 0) {
      
      const file= event.target.files[0];

      console.log("archivo:", file);
      
      if (file.type.includes("image")) {
        console.log("ENTRANDO EN EL IF PARA SUBIR LA IMAGEN")
        
        // Muestra la imagen cargada en el HTML
        const reader = new FileReader();
        reader.readAsDataURL(file);

        console.log("reader: ", reader);

        reader.onload = function load(this: any) {
          this.image = reader.result;
        }.bind(this);
        
        // Sube la imagen al servidor
        const form = new FormData();

        form.append('file', file);

        this.http
        .post(`${this.apiRoot}/images/upload`, form)
        .subscribe((response) => {
          this.file = response;
          console.log(response);
        })
      } else {
        console.error("THERE WAS AN ERROR")
      }

    }
  }
  
  registerDish() {

    // Modificamos el valor por la nueva ruta obtenida del servidor
    this.registerDishForm.value.photo = this.file.fileName;
    console.log('photo: ', this.registerDishForm.value.photo);
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

        console.log("reader: ", reader);

        reader.onload = function load(this: any) {
          this.image = reader.result;
        }.bind(this);
        
        // Sube la imagen al servidor
        const form = new FormData();

        form.append('file', file);

        this.http
        .post(`${this.apiRoot}/images/upload`, form)
        .subscribe((response) => {
          this.file = response;
          console.log(response);
        })
      } else {
        console.error("THERE WAS AN ERROR")
      }

    }
  }

}