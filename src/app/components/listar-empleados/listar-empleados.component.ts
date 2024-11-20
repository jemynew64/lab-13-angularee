import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
})
export class ListarEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router  // Inyecta Router
  ) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.getAllEmpleados().subscribe({
      next: (data) => (this.empleados = data),
      error: (err) => alert('Error al obtener los empleados: ' + err.message),
    });
  }

  eliminarEmpleado(id: number) {
    this.empleadoService.deleteEmpleado(id).subscribe({
      next: () => {
        this.empleados = this.empleados.filter((empleado) => empleado.id !== id);
        alert('Empleado eliminado exitosamente');
      },
      error: (err) => alert('Error al eliminar el empleado: ' + err.message),
    });
  }

  editarEmpleado(id: number) {
    // Redirige al formulario de creación de empleados con el ID del empleado
    this.router.navigate(['/crear-empleado', id]);
  }
}
