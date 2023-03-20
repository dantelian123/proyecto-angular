
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as jsonLogic from 'json-logic-js/';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public myForm!:FormGroup


  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.myForm = this.createForm();
    console.log(jsonLogic.apply({ "==": [1, 1] }));
    console.log(jsonLogic.apply(
      {
        "and": [
          { ">": [3, 4] },
          { "<": [1, 3] }
        ]
      }
    ));

  }
  private createForm():FormGroup{
    return this.fb.group(
      {usuario:['',Validators.required],
        password: ['', Validators.required],}
    )

  }
  public submit(){
    if(this.myForm.invalid){
      return;
    }
    alert("Se va a enviar el formulario")
    console.log(this.myForm.value);

  }
  public get f():any{
    return this.myForm.controls;
  }

}
