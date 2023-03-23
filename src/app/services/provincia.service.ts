import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Provincia } from '../model/provincia.model';
@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  url: string = "http://localhost:4200/assets/provincia.json"
  constructor() { }

  getDatos(){
    axios.get(this.url)
      .then(function (response) {

        console.log(response.data);
        return response.data
      })
  }
}
