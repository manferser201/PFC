import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoginI } from './login.interface';
import { ResponseI } from './response.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    url:string = window.location.pathname;

    constructor(private http: HttpClient) {}

    loginByEmail(form:LoginI):Observable<ResponseI>{

        let direccion = this.url + '/login';

        return this.http.post<ResponseI>(direccion, form);
    }
}