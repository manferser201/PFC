import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent{

  registerForm: FormGroup;
  apiRoot = 'http://localhost:5000';
  hide = true;

  constructor(public fb:FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8), Validators.required]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      identification: ['', Validators.required],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      
    });
  }

  register() {

    this.http
      .post<any>(this.apiRoot, this.registerForm.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/login']);
      }, (error) => {
        console.error(error)
      });
  }


  identificationValidator(identification: string){

  console.info("Entrando en el método validarDniNie() con el parámetro: ", identification);

    const letters = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    if(identification.charAt(0) == "X" || identification.charAt(0) == "Y" || identification.charAt(0) == "Z"){
        
        let resultado = this.NIEvalidator(identification, letters);
        return resultado;

    } else if(identification.charCodeAt(0) >= 48 && identification.charCodeAt(0) <= 57){

        let resultado = this.DNIvalidatro(identification, letters);
        return resultado;

    } else {

        console.error("El usuario no ha introducido un documento de identificación válido");
        alert("NO HA INTRODUCIDO NINGÚN DOCUMENTO DE IDENTIFICACIÓN VÁLIDO");
    }
  }

  DNIvalidatro(identification: any, letters: any) {
    console.info(`Entrando en el método comprobarDNI() con los parámetros: ${identification} y ${letters}`);

    if( !(/^\d{8}[A-Z]$/.test(identification)) ) {
        
        console.info("Saliendo del método comprobarDNI() con el resultado: ", false);

        return false;

    } else if(identification.charAt(identification.length - 1) != letters[(identification.substring(0, 8))%23]) {
        
        console.info("Saliendo del método comprobarDNI() con el resultado: ", false);

        return false;

    } else {
        
        console.info("Saliendo del método comprobarDNI() con el resultado: ", true);

        return true;
    }
  }

  NIEvalidator(identification: any, letters: any) {
    
  }

}