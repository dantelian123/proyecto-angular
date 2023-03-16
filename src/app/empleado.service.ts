import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './model/Persona.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private url: string ="http://localhost:8090/empleado"
  constructor(private http:HttpClient) { }

  //Mostrar lista de estudiantes
  get(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(this.url);
  }
  get1(id:number):Observable<Empleado>{
    return this.http.get<Empleado>(this.url+'/'+id);
  }
  //Insertar empleado
  insert(empleado:Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(this.url, empleado);
  }

  //Actualizar empleado
  update(empleado:Empleado):Observable<Empleado>{
    return this.http.put<Empleado>(this.url, empleado);
  }
  //eliminar empleado
  delete(id?:number):Observable<Empleado>{
    console.log(this.url + '/' + id);

    return this.http.delete<Empleado>(this.url+'/'+id,);
  }
}
