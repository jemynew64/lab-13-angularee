import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarProductosComponent} from "./components/listar-productos/listar-productos.component"
import { CrearProductoComponent} from "./components/crear-producto/crear-producto.component"
import { ListarEmpleadosComponent } from './components/listar-empleados/listar-empleados.component';
import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
const routes: Routes = [
  // Rutas de productos
  { path: '', component: ListarEmpleadosComponent },
  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'editar-producto/:id', component: CrearProductoComponent },

  // Rutas de empleados
  { path: 'empleados', component: ListarEmpleadosComponent },
  { path: 'crear-empleado', component: CrearEmpleadoComponent },
  { path: 'crear-empleado/:id', component: CrearEmpleadoComponent }, // Para editar un empleado

  // Redirección para rutas no encontradas
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
