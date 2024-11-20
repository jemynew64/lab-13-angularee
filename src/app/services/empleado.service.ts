import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
  id?: number;
  nombre: string;
  apellidos: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8000/api/empleado/'; // URL de tu API

  constructor(private http: HttpClient) {}

  getAllEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  updateEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}${id}/`, empleado);
  }

  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`); // Asegúrate de que la URL termina con '/'
  }

    // Obtener un empleado por su ID
  getEmpleadoById(id: number): Observable<Empleado> {
      return this.http.get<Empleado>(`${this.apiUrl}${id}/`); // Asegúrate de que la URL termina con '/'
    }
}
