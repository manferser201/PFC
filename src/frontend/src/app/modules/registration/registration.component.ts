import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit{

  registerForm: FormGroup;
  apiRoot = 'https://pfc-production.up.railway.app';
  hide = true;

  constructor(public fb:FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8), Validators.required]],
      repeatPass: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      identification: ['', Validators.required],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      
    }, {
      Validators: this.samePass('passwrod', 'repeatPass')
    });
  }

  samePass(password: string, repeatPass: string) {

    return (formGroup: FormGroup) => {
      
      const passwordControl = formGroup.controls[password];
      const repeatPassControl = formGroup.controls[repeatPass];

      if (repeatPassControl.errors && repeatPassControl.errors['samePass']) {
        return
      }

      if (passwordControl?.value !== repeatPassControl?.value) {
          repeatPassControl?.setErrors({samePass: true});
      } else {

        repeatPassControl?.setErrors(null);
      }
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('rol') == 'admin'){
      
      this.router.navigate(['/login']);
      alert('Lo siento. Para acceder a esta página tienes que estar logueado con un usuario normal');
    }
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

  identificationValidator(){

    const identification = this.registerForm.value.identification;

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
        return false;
    }
  }

  DNIvalidatro(dni: any, letters: any) {
    console.info(`Entrando en el método comprobarDNI() con los parámetros: ${dni} y ${letters}`);

    if( !(/^\d{8}[A-Z]$/.test(dni)) ) {
        
        console.info("Saliendo del método comprobarDNI() con el resultado: ", false);

        return false;

    } else if(dni.charAt(dni.length - 1) != letters[(dni.substring(0, 8))%23]) {
        
        console.info("Saliendo del método comprobarDNI() con el resultado: ", false);

        return false;

    } else {
        
        console.info("Saliendo del método comprobarDNI() con el resultado: ", true);

        return true;
    }
  }

  /**
   * Transforma la primera letra del NIE por los valores numéricos 1,2 o 3
   * 
   * @param {String} nie
   * @returns {Boolean}
   */
  NIEvalidator(nie: any, letters: any){
    
    console.info(`Entrando en el método comprobarNIE() con los parámetro: ${nie} y ${letters}`);
    
    let nieSinLetra = this.removeLetters(nie);

    if(!(/^[XYZ]\d{7}[A-Z]$/.test(nie))){
        
        console.info("Saliendo del método comprobarNIE() con el resultado: ", false);

        return false;
    
    } else if(nie.charAt(8) != letters[(nieSinLetra.substring(0, 8))%23]){
        
        console.info("Saliendo del método comprobarNIE() con el resultado: ", false);

        return false;
    
    } else {
        
        console.info("Saliendo del método comprobarNIE() con el resultado: ", true);

        return true;
    }
  }

  /**
   * Transforma la primera letra del NIE por los valores numéricos 1,2 o 3
   * 
   * @param {String} nie 
   * @returns {String}
   */
  removeLetters(nie: any){
      
      console.info("Entrando en el método transformarLetra() con el parámetro: ", nie);

      if(nie.charAt(0) == "X"){

          let nieSinLetra = nie.replace("X", 0);
          console.info("Saliendo del método transformarLetra() con el resultado: ", nieSinLetra);

          return nieSinLetra;

      } else if(nie.charAt(0) == "Y"){

          let nieSinLetra = nie.replace("Y", 1);
          console.info("Saliendo del método transformarLetra() con el resultado: ", nieSinLetra);

          return nieSinLetra;

      } else {

          let nieSinLetra = nie.replace("Z", 2);
          console.info("Saliendo del método transformarLetra() con el resultado: ", nieSinLetra);

          return nieSinLetra;
      }
  }

}