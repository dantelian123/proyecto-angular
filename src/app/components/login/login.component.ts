
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import * as jsonLogic from 'json-logic-js/';
import { credentials } from 'src/app/model/credenciales.model';
import { EmpleadoService } from 'src/app/services/empleado.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public myFormLogin!: FormGroup
  public myFormRegistro!: FormGroup
  creds:credentials={
    email:'',
    password:''
  };
  constructor(private fb: FormBuilder, private empleadoService:EmpleadoService,
    private router:Router) { }

  ngOnInit() {
    this.myFormLogin = this.createForm();
    this.myFormRegistro = this.createForm();
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
  private createForm(): FormGroup {
    return this.fb.group(
      {
        usuario: ['', [Validators.required]],
        password: ['', Validators.required],
      }
    )

  }
  public submit() {
    if (this.myFormLogin.invalid) {
      return;
    }
    console.log(this.creds);
    this.creds.email = this.myFormLogin.value.usuario;
    this.creds.password = this.myFormLogin.value.password;
    console.log(this.creds);

    this.empleadoService.login(this.creds).subscribe(
      response => {
        this.router.navigate([''])
      }
    )
  }
  public logOut(){
    this.empleadoService.logOut();
    this.router.navigate(['/login'])
  }
  public registrar() {
    if (this.myFormRegistro.invalid) {
      return;
    }

    this.myFormRegistro.reset();
  }
  public get f(): any {
    return this.myFormLogin.controls;
  }
  public get f2(): any {
    return this.myFormRegistro.controls;
  }

}
