import { Empleado } from './../../model/Persona.model';
import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-persona',
  templateUrl: './formulario-persona.component.html',
  styleUrls: ['./formulario-persona.component.css']
})
export class FormularioPersonaComponent implements OnInit{
  empleado: Empleado = {};
  constructor(private empleadoService:EmpleadoService, private router:Router,
     private activateroute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.cargar()
  }

  create():void{
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
  update():void{
    this.empleadoService.update(this.empleado).subscribe(
      e => this.router.navigate([''])
    )
  }
}
