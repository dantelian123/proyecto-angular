import { ProvinciaService } from './../../services/provincia.service';
import { Empleado } from './../../model/Persona.model';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as jsonLogic from 'json-logic-js/';
import axios from 'axios';
@Component({
  selector: 'app-formulario-persona',
  templateUrl: './formulario-persona.component.html',
  styleUrls: ['./formulario-persona.component.css']
})
export class FormularioPersonaComponent implements OnInit {
  form: any = {
    title: "Ingreso de Empleado",
    groups: [
      {
        fields: [
          {
            name: "nombre",
            type: "text",
            label: "Nombre:",
            required: true
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
            label: "Cedula: ingresar cedula valida con diez digitos",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "edad",
            type: "number",
            label: "Edad: mayor a 18 y menor a 45",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: "telefono",
            type: "tel",
            label: "Telefono: entre 8 y 10 digitos",
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            event: "onChange",
            name: "Provincia",
            type: "select",
            label: "Provincias",
            options: ["Guayas", "Pichincha"],
          },
          {
            name: "ciudad",
            type: "select",
            label: "Ciudad:",
            options: []
          },
        ],
      },

    ],
    buttons: [
      {
        text: "Registrar",
        submit: true,
        primary: true,
        center: true,
      },
    ],
  }
  cantones: any;
  empleado: Empleado = {};
  constructor(private empleadoService: EmpleadoService, private router: Router,
    private activateroute: ActivatedRoute, private provinciaService: ProvinciaService, private fb: FormBuilder) {
  }

  //Carga los datos en el formulario si se inicia el formulario para editar empleado
  ngOnInit(): void {
    this.cargar()
    this.obtenerDatos();
  }

  //Metodo para insertar empleado (Actualmente no se esta usando)
  create(): void {
    console.log(this.validarTelefono());

    if (this.validarTelefono()) {
      console.log("telefono invalido");

    } else {
      console.log(this.empleado);

      this.empleadoService.insert(this.empleado).subscribe(
        res => this.router.navigate([''])
      )
    }
  }
  cargar(): void {
    this.activateroute.params.subscribe(
      enlace => {
        let id = enlace['codigo'];
        console.log(id);
        if (id) {
          this.empleadoService.get1(id).subscribe(
            es => this.empleado = es
          )
        }
      }
    )
  }
  guardar() {

  }
  //Actualiza empleado
  update(): void {
    this.empleadoService.update(this.empleado).subscribe(
      e => this.router.navigate([''])
    )
  }

  //Obtiene los valores del formulario json al hacer submit
  //Metodo para insertar empleado (Actualmente se esta usando)
  handleValues(values: any) {
    //setea los valores del atributo empleado con los valores ingresados en el formulario
    this.empleado = values;
    //valida si la longitud del telefono cumple la condicion
    if (!this.validarTelefono() || !this.validarCedula() || !this.validarEdad()) {
      alert("Ingresa datos válidos");
    } else {
      console.log(values);
      this.empleadoService.insert(this.empleado).subscribe(
        res => this.router.navigate([''])
      )
    }
  }

  //validacion longittud de telefono //Prueba
  validarTelefono(): boolean {
    var rules: any = {
      "and": [
        { "<=": [{ "var": "tel" }, 10] },
        { ">=": [{ "var": "tel" }, 8] }
      ]
    };
    let data = { "tel": this.empleado.telefono!.length }
    return jsonLogic.apply(rules, data);
  }

  //Validar rango de edad
  validarEdad(): boolean {
    var rules: any = {
      "and": [
        { ">": [{ "var": "edad" }, 18] },
        { "<": [{ "var": "edad" }, 45] }
      ]
    };
    let data = { "edad": this.empleado.edad }
    return jsonLogic.apply(rules, data);
  }

  //Validar tamaño de la cedula
  validarCedula(): boolean {
    var rules: any = {
      "and": [
        { "==": [{ "var": "cedula" }, 10] }
      ]
    };
    let data = { "cedula": this.empleado.cedula!.length }
    return jsonLogic.apply(rules, data);
  }

  //Comprueba que ciudades se muestran en la lista segun la provincia escogida
  comprobarCiudades(event: any): string {
    var rule = { "var": event['value'] }
    var data = { "Guayas": "guayas", "Pichincha": "pichincha" };
    return jsonLogic.apply(rule, data);
  }

  //Obtiene el evento del form json
  handleEvent(event: any) {
    console.log(this.cantones["Provincia"]["GUAYAS"]["cantones"]["nombre_canton"]);
    //let cantones = Object.entries(this.cantones[1][0])
    //console.log(cantones);

    let cantonesGuayas = ["Guayaquil", "Duran", "Milagro", "Naranjal"]
    let cantonesPichincha = ["Quito", "Cayambe", "Machachi", "Mejía"]
    if (event.event == "onChange" && this.comprobarCiudades(event) == "guayas") {
      //cantones = cantones[9];
      this.form['groups'][5]['fields'][1] = {
        name: "ciudad",
        type: "select",
        label: "Ciudad:",
        options: [],
        optionsView: [],
        selected: true,
        error: false
      }
      this.form['groups'][5]['fields'][1].options = this.cantones["Provincia"]["GUAYAS"]["cantones"]["nombre_canton"];
      this.form['groups'][5]['fields'][1].optionsView = this.cantones["Provincia"]["GUAYAS"]["cantones"]["nombre_canton"];
    } else if (event.event == "onChange" && this.comprobarCiudades(event) == "pichincha") {
      this.form['groups'][5]['fields'][1] = {
        name: "ciudad",
        type: "select",
        label: "Ciudad:",
        options: [],
        optionsView: [],
        selected: true,
        error: false
      }
      this.form['groups'][5]['fields'][1].options = this.cantones["Provincia"]["PICHINCHA"]["cantones"]["nombre_canton"];
      this.form['groups'][5]['fields'][1].optionsView = this.cantones["Provincia"]["PICHINCHA"]["cantones"]["nombre_canton"];
    }

  }

  url: string = "http://localhost:4200/assets/provincia.json";

  obtenerDatos() {
    axios.get(this.url).then(
      response => {
       // console.log(response.data)
        this.cantones = response.data

      }


    )
  }

}
