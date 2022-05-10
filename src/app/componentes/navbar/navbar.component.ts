import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLogged: boolean = false;    
  constructor(
    private authService: AuthService) { }

  //////////////PARA SABER QUE BUTTON MOSTRAR SI EL LOGIN O LOGOUT EN HTML//////
  ngOnInit(): void {                         //SI ESTALOGUEADO (TRUE),ENTONCES MUE3STRA LOGOUT
    this.isUserLogged = this.authService.isUserLogged();
  }

  logout(): void {
    this.authService.logout();//REMOVEMOS LA VALIDACION DESDE AUTH SERVICE
    this.isUserLogged = false;//AL SER FALSO MUESTRA LOGIN,QUE LUEGO AL PRESIONAR DERIVA AL HTML LOGIN
    window.location.reload();
  }

  ShowFace(){
    confirm("bautista2022")
  }
}
