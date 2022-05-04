import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/data/Proyecto';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyectoList:Proyecto[]=[]
  isUserLogged:boolean=false

  proyectoForm:FormGroup
  constructor(private porfolioService:PorfolioService,
              private authService:AuthService,
              private formBuilder:FormBuilder) {
   this.proyectoForm=this.formBuilder.group({
       id:[''],
       proyect:['',[Validators.required]],
       details:['',[Validators.required]]  
   })
  }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloadData()
  }

  private clearForm(){
    this.proyectoForm.setValue({
      id:'',
      proyect:'',
      details:''
    })
  }

  private reloadData(){
    this.porfolioService.obtenerDatosProyecto().subscribe(
      (data)=>{
        this.proyectoList=data;
      }
    )
  }

  private loadForm(proyecto:Proyecto){
    this.proyectoForm.setValue({
      id:proyecto.id,
      proyect:proyecto.proyect,
      details:proyecto.details
    })
  }

onSubmit(){
  let proyecto:Proyecto=this.proyectoForm.value;
  if(this.proyectoForm.get('id')?.value==''){
    this.porfolioService.guardarNuevoProyecto(proyecto).subscribe(
      (newProyecto)=>{
           this.proyectoList.push(newProyecto);
      }
    )
  }else{
    this.porfolioService.modificarProyecto(proyecto).subscribe(
      ()=>{
        this.reloadData();
      }
    )
  }
}

onNewProyecto(){
  this.clearForm();
}

onEditProyecto(index:number){
  let proyecto:Proyecto=this.proyectoList[index]
  this.loadForm(proyecto);
}

}
