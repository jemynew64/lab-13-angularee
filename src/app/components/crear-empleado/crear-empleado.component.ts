import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute y Router

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
})
export class CrearEmpleadoComponent implements OnInit {
  empleadoForm: FormGroup;
  empleadoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private route: ActivatedRoute,  // Inyecta ActivatedRoute
    private router: Router  // Inyecta Router
  ) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Obtén el ID del empleado de la ruta
    this.empleadoId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.empleadoId) {
      // Si estamos editando, obtén los datos del empleado
      this.cargarEmpleado();
    }
  }

  cargarEmpleado() {
    if (this.empleadoId) {
      this.empleadoService.getEmpleadoById(this.empleadoId).subscribe({
        next: (empleado) => {
          this.empleadoForm.patchValue(empleado);  // Carga los datos en el formulario
        },
        error: (err) => alert('Error al cargar el empleado: ' + err.message),
      });
    }
  }

  agregarEmpleado() {
    if (this.empleadoForm.valid) {
      if (this.empleadoId) {
        // Si estamos editando, actualiza el empleado
        this.empleadoService.updateEmpleado(this.empleadoId, this.empleadoForm.value).subscribe({
          next: () => {
            alert('Empleado actualizado exitosamente');
            this.router.navigate(['/']);  // Redirige a la lista de empleados
          },
          error: (err) => alert('Error al actualizar el empleado: ' + err.message),
        });
      } else {
        // Si estamos creando un nuevo empleado
        this.empleadoService.createEmpleado(this.empleadoForm.value).subscribe({
          next: () => {
            alert('Empleado creado exitosamente');
            this.router.navigate(['/']);  // Redirige a la lista de empleados
          },
          error: (err) => alert('Error al crear el empleado: ' + err.message),
        });
      }
    }
  }
}
