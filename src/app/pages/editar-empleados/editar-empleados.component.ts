import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import Empleado from '../../models/empleado';

@Component({
  selector: 'app-editar-empleados',
  templateUrl: './editar-empleados.component.html',
  styleUrl: './editar-empleados.component.css'
})
export class EditarEmpleadosComponent implements OnInit {

  //Propiedades:
  editarEmpleadoForm: FormGroup;
  enviado = false;
  empleadoDepartamento: any = [
    'Contabilidad',
    'Finanzas',
    'Recursos Humanos',
    'TI',
    'Ventas',
    'Patron'
  ];
  empleadoData: Empleado[] = [];

  constructor(
    public FormBuilder: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService,
    private actRoute: ActivatedRoute
  ){
    this.mainForm();
  }

  ngOnInit(): void {
    this.mainForm()
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmpleado(id);

    this.editarEmpleadoForm = this.FormBuilder.group({
      nombre: ['',[Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9._%+-]+.[a-z]{2,3}$'),
      ]],
      telefono:['', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]],
    });
  }

  //Método para generar el formulario:
  mainForm(){
    this.editarEmpleadoForm = this.FormBuilder.group({
      nombre: ['',[Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9._%+-]+.[a-z]{2,3}$'),
      ]],
      telefono:['', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]],
    });
  }

  //Método para asignar el departamento seleccionado por el usuario
  actualizarDepartamento(d){
    this.editarEmpleadoForm.get('departamento').setValue(d,{
      onlySelf:true
    });
  }

  //Getter para acceder a los controles del formulario
  get myForm(){
    return this.editarEmpleadoForm.controls;
  }

  //Método para buscar al empleado a modificar
  getEmpleado(id) {
    this.empleadoService.getEmpleado(id)
      .subscribe(data => {
        this.editarEmpleadoForm.setValue({
          nombre: data['nombre'],
          departamento: data['departamento'],
          email: data['email'],
          telefono: data['telefono'],
        });
      });
  }

  //Método para enviar el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.editarEmpleadoForm.valid) return false;
    
    if (window.confirm('¿Estás seguro de que quieres modificar este empleado?')) {
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.empleadoService.actualizarEmpleado(id, this.editarEmpleadoForm.value)
      .subscribe({
        complete: () => {
          this.router.navigate(['/listar-empleados']);
          console.log('Empleado modificado correctamente');
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
