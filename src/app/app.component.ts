
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JsonFormData } from './components/json-form/json-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public formData:any;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get('../assets/form.json')
    .subscribe((formData)=>{
      this.formData = formData;
    })
  }
  title = 'Formulario';
}
