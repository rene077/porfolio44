import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,Form } from '@angular/forms';
import { Info } from 'src/app/data/Info';
import { AuthService } from 'src/app/servicios/auth.service';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

   infoList:Info[]=[]  
   isUserLogged:boolean=false;

   infoForm:FormGroup;

  constructor(private porfolioService:PorfolioService,
    private authService:AuthService,
    private formBuilder:FormBuilder) {
      this.infoForm=this.formBuilder.group({
           id:[''],
           name:['',[Validators.required]],
           title:['',[Validators.required]],
           location:['',[Validators.required]],
           company:['',[Validators.required]],
           correo:['',[Validators.required,Validators.email]],
           celular:['',[Validators.required]],
           imgp:['',[Validators.required]],
           imgl:['',[Validators.required]]
      })
     }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.reloadData();
  }
             
  private reloadData(){
    this.porfolioService.obtenerDatosInfo().subscribe(
      (data)=>{
        this.infoList=data;
      }
    )
  }

  private loadForm(info:Info){
    this.infoForm.setValue({
      id:info.id,
      name:info.name,
      title:info.title,
      location:info.location,
      company:info.company,
      correo:info.correo,
      celular:info.celular,
      imgp:info.imgp,
      imgl:info.imgl
    })
  }

  onSubmit(){
    let info:Info=this.infoForm.value;
    this.porfolioService.modificarInfo(info).subscribe(
      ()=>{
        this.reloadData();
      }
    )
  }

  onEditInfo(index:number){
    let info:Info=this.infoList[index];
    this.loadForm(info);
  }

  get Correo(){
    return this.infoForm.get('correo')
  }

  get Name(){
    return this.infoForm.get('name')
  }

  get Title(){
    return this.infoForm.get('title')
  }

  get Company(){
    return this.infoForm.get('company')
  }
}
