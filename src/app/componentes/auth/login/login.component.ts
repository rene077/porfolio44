import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginError: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
      this.form = this.formBuilder.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
        }
      )
     }

  ngOnInit(): void {
  }
  
  //ENVIAMOS LAS CREDENCIALES PARA SABER SI ESTAMOS AUTENTICADO
  onSubmit(event: Event) {
    event.preventDefault;

    this.authService.login(this.form.value).subscribe(
      (response: Boolean) => {
        if (response)
          this.router.navigate(['/porfolio']);
        else
          this.loginError = true;//para usarlo en el html como validacion de msn de error,si el email es invalido
      }
    );
  }

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }
}
