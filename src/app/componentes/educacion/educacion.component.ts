import { Component, OnInit } from '@angular/core';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Educacion } from 'src/app/data/Educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList: Educacion[] = []
  isUserLogged: Boolean = false;

  educationForm:FormGroup;

  constructor(private porfolioService: PorfolioService,
    private AuthService:AuthService,
    private formBuilder:FormBuilder) {
      this.educationForm=this.formBuilder.group({
         id:[''],  
         school:['',[Validators.required]],
         title:['',[Validators.required]],
         score:['',[Validators.required]],
         img:['',[Validators.required]],
         career:['',[Validators.required]],
         start:['',[Validators.required]],
         end:['',[Validators.required]],
         course:['',[Validators.required]]
      });
     }

  ngOnInit(): void {
    this.isUserLogged = this.AuthService.isUserLogged();
    this.reloadData();
  }

  private reloadData(){
    this.porfolioService.obtenerDatosEducacion().subscribe(
      (data) => {
        this.educacionList = data;
      }
    );
  }
//PARA LIMPIAR FORMU CADA QUE CONSULATMOS O USAMOS
 private clearForm(){
   this.educationForm.setValue({
       id:'',
       school:'',
       title:'',
       score:0,
       img:'',
       career:'',
       start:'',
       end:'',
       course:''
   })
 }
//PARA CARGAR EL UPDATE FORMU AL QUERER EDITAR TALES DATOS
 private loadForm(educacion:Educacion){
    this.educationForm.setValue({
      id: educacion.id,
      school: educacion.school,
      title: educacion.title,
      score: educacion.score,
      img: educacion.img,
      career:educacion.career,
      start:educacion.start,
      end:educacion.end,
      course:educacion.course
    })
 }

 onSubmit(){
   let educacion:Educacion=this.educationForm.value;
   if (this.educationForm.get('id')?.value == ''){
    this.porfolioService.guardarNuevaEducacion(educacion).subscribe(
      (newEducacion:Educacion)=>{
        this.educacionList.push(newEducacion);
      }
    );
   }else{
     this.porfolioService.modificarEducacion(educacion).subscribe(
       ()=>{
           this.reloadData();   
       })
   }
   
 }
 onNewEducation(){
   this.clearForm();
 }

 onEditEducation(index:number){
  let educacion:Educacion=this.educacionList[index]
  this.loadForm(educacion);//ponemos en el formulario los valores a modificar
}

onDeleteEducation(index:number){
  let educacion:Educacion=this.educacionList[index]
  if(confirm("¿Esta seguro que desea borrar la educacion seleccionada?")){
    this.porfolioService.borrarEducacion(educacion.id).subscribe(
      ()=>{
        this.reloadData();
      }
    )
  } 
}

}