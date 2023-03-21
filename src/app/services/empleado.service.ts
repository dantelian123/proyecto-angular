import { credentials } from './../model/credenciales.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Empleado } from '../model/Persona.model';

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
  login(creds:credentials){
    return this.http.post("http://localhost:8090/login", creds, {
      observe:'response'
    }).pipe(map((response:HttpResponse<any>)=>{
      const body = response.body;
      const headers = response.headers
      const bearerToken = headers.get('Authorization')!;
      const token  = bearerToken.replace('Bearer ', '');

      localStorage.setItem('token', token);
      return body;
    }));
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logOut(){
    localStorage.removeItem('token');
  }
}
