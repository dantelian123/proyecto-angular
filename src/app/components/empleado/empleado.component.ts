import { EmpleadoService } from './../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/model/Persona.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleados?:Empleado[];

  ngOnInit(): void {
    console.log();
    this.servicioEmpleado.get().subscribe(
      empleado=>{
        this.empleados=empleado;
        console.log(this.empleados[0].fechaNac);
        console.log(this.empleados);
      }
    );
  }
  constructor(private servicioEmpleado: EmpleadoService, private router: Router,
    private activateroute: ActivatedRoute, private empleadoService:EmpleadoService){

  }
  delete(id?:number):void{
    this.servicioEmpleado.delete(id).subscribe(
      e => this.ngOnInit()
    )
  }
  public logOut() {
    this.empleadoService.logOut();
    this.router.navigate(['/login'])
  }
}
