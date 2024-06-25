import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})
export class AgregarEmpleadoComponent implements OnInit {

  //Propiedades:
  empleadoForm: FormGroup;
  enviado = false;
  empleadoDepartamento: any = [
    'Contabilidad',
    'Finanzas',
    'Recursos Humanos',
    'TI',
    'Ventas',
    'Patron'
  ];

  constructor(
    public FormBuilder: FormBuilder,
    private router: Router,
    private NgZone: NgZone,
    private empleadoService: EmpleadoService
  ){
    this.mainForm();
  }

  ngOnInit(): void {
    
  }

  //Método para generar el formulario:
  mainForm(){
    this.empleadoForm = this.FormBuilder.group({
      nombre: ['',[Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9._%+-]+.[a-z]{2,3}$'),
      ]],
      telefono:['',[
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]],
    });
  }

  //Método para asignar el departamento seleccionado por el usuario
  actualizarDepartamento(d){
    this.empleadoForm.get('departamento').setValue(d,{
      onlySelf:true
    });
  }

  //Getter para acceder a los controles del formulario
  get myForm(){
    return this.empleadoForm.controls;
  }

  //Método para enviar el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.empleadoForm.valid) return false;
  
    return this.empleadoService.agregarEmpleado(this.empleadoForm.value)
    .subscribe({
      complete: ()=>{
        console.log('Empleado agregado correctamente')
        this.NgZone.run(()=> this.router.navigateByUrl('/listar-empleados'))
      },
      error: (error) => {
        console.log(error);
      }
    })  
  }
}
