import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  // Propiedades
  baseURL : string = 'http://localhost:4000/api'
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')


  constructor(private http:HttpClient) { }

  // Agregar empleado
  agregarEmpleado(data): Observable<any> {
    let url = `${this.baseURL}/agregar`

    return this.http.post(url, data)
      .pipe(catchError(this.errorManager))
  }

  // Obtener empleados
  getEmpleados() {
    let url = `${this.baseURL}/empleados`
    return this.http.get(url)
  }

  getEmpleado(id): Observable<any> {
    let url = `${this.baseURL}/empleado/${id}`
    
    return this.http.get(url, { headers: this.headers })
      .pipe(map((res:Response) => {
        return res || {};
      }),
      catchError(this.errorManager))
  }

  // Actualizar empleado
  actualizarEmpleado(id, data): Observable<any> {
    let url = `${this.baseURL}/actualizar/${id}`

    return this.http.put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager))
  }

  // Eliminar empleado
  eliminarEmpleado(id): Observable<any> {
    let url = `${this.baseURL}/delete/${id}`

    return this.http.delete(url, { headers: this.headers })
      .pipe(catchError(this.errorManager))
  }

  // Manejador de errores
  errorManager(error: HttpErrorResponse) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = error.error.message
    } 
    else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`

    }
    console.log(errorMessage)
    return throwError(() => errorMessage)
  }
}
