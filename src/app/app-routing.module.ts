import { FormularioPersonaComponent } from './components/formulario-persona/formulario-persona.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado.component';

const routes: Routes = [
  { path: '', component: EmpleadoComponent },
  { path: 'agregar', component: FormularioPersonaComponent },
  { path: 'editar/:codigo', component: FormularioPersonaComponent },
  { path: 'eliminar/:codigo', component: FormularioPersonaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
