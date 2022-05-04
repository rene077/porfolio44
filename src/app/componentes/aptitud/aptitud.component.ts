import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aptitud } from 'src/app/data/Aptitud';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-aptitud',
  templateUrl: './aptitud.component.html',
  styleUrls: ['./aptitud.component.css']
})
export class AptitudComponent implements OnInit {

  aptitudList:Aptitud[]=[]
  isUserLogged:boolean=false;

  aptitudForm:FormGroup;
  constructor(private porfolioService:PorfolioService,
              private authService:AuthService,
              private formBuilder:FormBuilder) { 
      this.aptitudForm=this.formBuilder.group({
        id:[''],
        aptitud:['',[Validators.required]],
        resolution:['',[Validators.required]],
        validators:['',[Validators.required]]
      })

  }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloadData();
  }

  private reloadData(){
    this.porfolioService.obtenerDatosAptitud().subscribe(
      (data)=>{
        this.aptitudList=data;
      })
  }

  private clearForm(){
    this.aptitudForm.setValue({
      id:'',
      aptitud:'',
      resolution:'',
      validators:''  
    })
  }

  private loadForm(aptitud:Aptitud){
    this.aptitudForm.setValue({
      id:aptitud.id,
      aptitud:aptitud.aptitud,
      resolution:aptitud.resolution,
      validators:aptitud.validators
    })
  }

  onSubmit(){
    let aptitud:Aptitud=this.aptitudForm.value;
    if(this.aptitudForm.get('id')?.value== ''){
      this.porfolioService.guardarNuevaAptitud(aptitud).subscribe(
        (newAptitud:Aptitud)=>{
             this.aptitudList.push(newAptitud);
        }
      );
    } else{
      this.porfolioService.modificarAptitud(aptitud).subscribe(
        ()=>{
          this.reloadData();
        }
      )
    } 
  }

  onNewAptitud(){
    this.clearForm();
  }

  onEditAptitud(index:number){
    let aptitud:Aptitud=this.aptitudList[index]
    this.loadForm(aptitud);
  }

}
