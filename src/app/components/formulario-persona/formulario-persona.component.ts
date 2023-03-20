import { HttpClient } from '@angular/common/http';
import { Empleado } from './../../model/Persona.model';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario-persona',
  templateUrl: './formulario-persona.component.html',
  styleUrls: ['./formulario-persona.component.css']
})
export class FormularioPersonaComponent implements OnInit{
  form:any={
    title: "Ingreso de Empleado",
    groups: [
      {
        fields: [
          {
            name: "nombre",
            type: "text",
            label: "Nombre:",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "apellido",
            type: "text",
            label: "Apellido:",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "cedula",
            type: "text",
            label: "Cedula:",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "edad",
            type: "number",
            label: "Edad:",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "telefono",
            type: "tel",
            label: "Telefono:",
            required: true,
          },
        ],
      },

    ],
    buttons: [
      {
        text: "Registrar",
        submit: true,
        primary: true,
        center:true,
      },
    ],
  }
  formActualizar: any = {
    title: "Actualizar Empleado",
    groups: [
      {
        fields: [
          {
            name: "nombre",
            type: "text",
            label: "Nombre:",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "apellido",
            type: "text",
            label: "Apellido:",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "cedula",
            type: "text",
            label: "Cedula:",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "edad",
            type: "number",
            label: "Edad:",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "telefono",
            type: "tel",
            label: "Telefono:",
            required: true,
          },
        ],
      },

    ],
    buttons: [
      {
        text: "Actualizar",
        submit: true,
        primary: true,
        center: true,
      },
    ],
  }
  empleado: Empleado = {};
  constructor(private empleadoService:EmpleadoService, private router:Router,
    private activateroute: ActivatedRoute, private http: HttpClient, private fb: FormBuilder){
  }



  ngOnInit(): void {
    this.cargar()
  }



  create():void{
    console.log(this.empleado);

     this.empleadoService.insert(this.empleado).subscribe(
      res => this.router.navigate([''])
     )
  }
  cargar():void{
    this.activateroute.params.subscribe(
      enlace=>{
        let id=enlace['codigo'];
        console.log(id);
        if(id){
          this.empleadoService.get1(id).subscribe(
            es=>this.empleado=es
          )
        }
      }
    )
  }
  guardar(){

  }
  update():void{
    this.empleadoService.update(this.empleado).subscribe(
      e => this.router.navigate([''])
    )
  }

  handleValues(values:any){
    this.empleado = values;
    console.log(values);
    this.empleadoService.insert(this.empleado).subscribe(
      res => this.router.navigate([''])
    )
  }
}
