import { Injectable } from '@angular/core';
import { Educacion } from '../data/Educacion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../data/config/Config';
import { Acerca } from '../data/Acerca';
import { Info } from '../data/Info';
import { Experiencia } from '../data/Experiencia';
import { Aptitud } from '../data/Aptitud';
import { Proyecto } from '../data/Proyecto';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {
  constructor(private http: HttpClient) { }

  obtenerDatosEducacion2(): Observable<Educacion[]> {
    return this.http.get<any>("./assets/data/educacion.json").pipe(
      map(res => res.education)
    );
  }

  obtenerDatosEducacion(): Observable<Educacion[]> {
    return this.http.get<any>(config.baseUrl + "educacion");
  }

  guardarNuevaEducacion(educacion:Educacion): Observable<Educacion> {
    return this.http.post<any>(config.baseUrl + "educacion/create", educacion);
  }

  modificarEducacion(educacion: Educacion): Observable<any> {
    return this.http.put<any>(config.baseUrl + "educacion/update", educacion);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "educacion/" + id);
  }

  ////////////////////////////////////ACERCA///////////////////////////////////////////
  obtenerDatosAcerca():Observable<Acerca[]>{
    return this.http.get<any>(config.baseUrl+"acerca");
  }

  modificarAcerca(acerca:Acerca):Observable<Acerca>{
    return this.http.put<any>(config.baseUrl+"acerca/update", acerca);
  }

  guardarNuevaAcerca(acerca:Acerca):Observable<Acerca>{
    return this.http.post<any>(config.baseUrl+"acerca/create",acerca);
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  obtenerDatosInfo():Observable<Info[]>{
     return this.http.get<any>(config.baseUrl+"info");
  }

  modificarInfo(info:Info):Observable<Info>{
    return this.http.put<any>(config.baseUrl+"info/update",info);
  }
///////////////////////////////////////////////////////////////////////////////////////////
  obtenerDatosExperiencia():Observable<Experiencia[]>{
    return this.http.get<any>(config.baseUrl+"experiencia");
  }

  modificarExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.put<any>(config.baseUrl+"experiencia/update",experiencia);
  }

  borrarExperiencia(id:number):Observable<any>{
    return this.http.delete<any>(config.baseUrl+"experiencia/"+id);
  }

  guardarNuevaExperiencia(experiencia:Experiencia):Observable<Experiencia>{
    return this.http.post<any>(config.baseUrl+"experiencia/create",experiencia);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  obtenerDatosAptitud():Observable<Aptitud[]>{
    return this.http.get<any>(config.baseUrl+"aptitud");
  }

  guardarNuevaAptitud(aptitud:Aptitud):Observable<Aptitud>{
    return this.http.post<any>(config.baseUrl+"aptitud/create",aptitud);
  }

  modificarAptitud(aptitud:Aptitud):Observable<Aptitud>{
    return this.http.put<any>(config.baseUrl+"aptitud/update",aptitud);
  }

  borrarAptitud(id:number):Observable<Aptitud>{
    return this.http.delete<any>(config.baseUrl+"aptitud/"+id);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

obtenerDatosProyecto():Observable<Proyecto[]>{
  return this.http.get<any>(config.baseUrl+"proyecto");
}
guardarNuevoProyecto(proyecto:Proyecto):Observable<Proyecto>{
  return this.http.post<any>(config.baseUrl+"proyecto/create",proyecto);
}
modificarProyecto(proyecto:Proyecto):Observable<Proyecto>{
 return this.http.put<any>(config.baseUrl+"proyecto/update",proyecto);
}
borrarProyecto(id:number):Observable<Proyecto>{
  return this.http.delete<any>(config.baseUrl+"proyecto/"+id);
}
}
