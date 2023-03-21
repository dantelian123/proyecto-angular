import { EmpleadoService } from 'src/app/services/empleado.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private empleadoService: EmpleadoService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.empleadoService.getToken();
    if(token){
      const cloned = request.clone({
        headers:request.headers.set('Authorization',`Bearer ${token}`)
      })
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
