import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from './components/login/login.component';
import { EmpleadoService } from './services/empleado.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  constructor(private router: Router, private empleadoService:EmpleadoService){}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.empleadoService.getToken()){
      return true
    }
    //redireccion al login
    alert('No tienes permisos')
    this.router.navigate(['/login'])
    return false;
  }


}
