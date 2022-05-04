import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoComponent } from './componentes/info/info.component';
import { AcercaComponent } from './componentes/acerca/acerca.component';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { AptitudComponent } from './componentes/aptitud/aptitud.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    AcercaComponent,
    ProyectoComponent,
    EducacionComponent,
    AptitudComponent,
    ExperienciaComponent,
    PortfolioComponent,
    NavbarComponent ,
    LoginComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
