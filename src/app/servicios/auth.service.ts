import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../data/LoginDto';
import { Observable } from 'rxjs';
import { config } from '../data/config/Config';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  //////METODO DE AUTHENTICATION//////////////////
  public login(credentials:LoginDto) : Observable<Boolean> {
    return this.http.post<Boolean>(config.baseUrl + "login", credentials).pipe(
      tap((response: Boolean) => {
        if (response)
          sessionStorage.setItem("user", "rene");//SI SE VALIDO BIEN ENTONCES COLOCAMOS VALOR(ENDE VALIDACION P/BUTTON LOGOUT)
      })
    );
  }

  public logout() {
    sessionStorage.removeItem("user");
  }
//////////////////AVIZA SI ALGUIEN ESTA LOGUEADO//////////
  public isUserLogged():boolean {
    return sessionStorage.getItem("user") !== null;
  }
}
