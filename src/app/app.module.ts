import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { ListarEmpleadosComponent } from './pages/listar-empleados/listar-empleados.component';
import { EditarEmpleadosComponent } from './pages/editar-empleados/editar-empleados.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarEmpleadoComponent,
    ListarEmpleadosComponent,
    EditarEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
