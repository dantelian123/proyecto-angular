import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JsonFormComponent } from './components/json-form/json-form.component';
//import { MatStepperModule } from '@angular/material/stepper';
//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatSliderModule } from "@angular/material/slider";
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { FormularioPersonaComponent } from './components/formulario-persona/formulario-persona.component';
import { AngularJsonFormModule } from 'angular-json-form';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    JsonFormComponent,
    EmpleadoComponent,
    FormularioPersonaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularJsonFormModule,
    //MatStepperModule,
   // MatFormFieldModule,
    //MatInputModule,
    BrowserAnimationsModule,
    //MatSliderModule,
    FormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
