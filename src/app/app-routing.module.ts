import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { ListarEmpleadosComponent } from './pages/listar-empleados/listar-empleados.component';
import { EditarEmpleadosComponent } from './pages/editar-empleados/editar-empleados.component';

const routes: Routes = [
  {path: '', redirectTo: 'agregar-empleado', pathMatch: 'full'},
  {path: 'agregar-empleado', component: AgregarEmpleadoComponent},
  {path: 'listar-empleados', component: ListarEmpleadosComponent},
  {path: 'editar-empleado/:id', component: EditarEmpleadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
