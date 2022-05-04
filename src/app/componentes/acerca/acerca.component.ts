import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,Form } from '@angular/forms';
import { Acerca } from 'src/app/data/Acerca';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  acercaList:Acerca[]=[]
  isUserLogged:boolean=false;

  acercaForm:FormGroup;

  constructor(private  porfolioService:PorfolioService,
    private authservice:AuthService,
    private formBuilder:FormBuilder) {
      this.acercaForm=this.formBuilder.group({
        id:[''],
        details:['',[Validators.required]]
      });
     }

  ngOnInit(): void {
    this.isUserLogged = this.authservice.isUserLogged();
    this.ReloadData();
  }

  private ReloadData(){
     this.porfolioService.obtenerDatosAcerca().subscribe(
       (data)=>{
         this.acercaList=data;
       }
     )
  }

  private clearForm(){
    this.acercaForm.setValue({
      id:'',
      details:''
    })
  }

  private loadForm(acerca:Acerca){
    this.acercaForm.setValue({
     id:acerca.id,
     details:acerca.details 
    })
  }

  onSubmit(){
    let acerca:Acerca=this.acercaForm.value;
    if(this.acercaForm.get('id')?.value== ''){
      this.porfolioService.guardarNuevaAcerca(acerca).subscribe(
        (newAcerca:Acerca)=>{
          this.acercaList.push(newAcerca);
        }
      );
    }else{
      this.porfolioService.modificarAcerca(acerca).subscribe(
        ()=>{
          this.ReloadData();
        }
      )
    }
  }

 onNewAcerca(){
   this.clearForm();
 }

 onEditAcerca(index:number){
    let acerca:Acerca=this.acercaList[index];
    this.loadForm(acerca);
  }

}
