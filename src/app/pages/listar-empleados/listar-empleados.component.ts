import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrl: './listar-empleados.component.css'
})
export class ListarEmpleadosComponent implements OnInit{

  empleados: any = []

  constructor(private empleadoService: EmpleadoService) {
    this.getEmpleados()
  }

  ngOnInit(): void {
    
  }

  getEmpleados(){
    this.empleadoService.getEmpleados()
      .subscribe(data => {
        this.empleados = data
      })
  }

  // Eliminar un empleado
  eliminarEmpleado(empleado, idx) {
    if(window.confirm('¿Estas seguro de eliminar el empleado?')) {
      this.empleadoService.eliminarEmpleado(empleado._id)
        .subscribe(data => {
          this.empleados.splice(idx, 1)
        })
    }
  }
}
