import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }
  login(usuario:string, password:string){
    this.apiService.login(usuario, password);
  }
}
