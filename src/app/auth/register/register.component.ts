import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    FormsModule,
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  nombre = '';
  correo_electronico = '';
  password = '';
  tipo = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.error = null;
    this.auth.register({
      nombre: this.nombre,
      correo_electronico: this.correo_electronico,
      password: this.password,
      tipo: this.tipo
    }).pipe(
      // Usamos pipe para encadenar operadores de RxJS como catchError
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          // Este es el caso de "ERR_CONNECTION_REFUSED" o "Unknown Error"
          // Significa que no se pudo establecer conexión con el servidor.
          this.error = 'No se pudo conectar con el servidor. Por favor, verificá tu conexión a internet o intentá de nuevo más tarde.';
        } else if (err.error && err.error.message) {
          // Si el servidor respondió con un error y tiene un mensaje en el cuerpo
          // (ej. validaciones, credenciales incorrectas, etc.)
          this.error = `Error al registrar: ${err.error.message}`;
        } else {
          // Para cualquier otro tipo de error inesperado
          this.error = 'Ocurrió un error inesperado durante el registro. Por favor, intentá de nuevo.';
        }
        console.error('Error en el registro:', err); // Loguear el error completo para debug
        return throwError(() => new Error(this.error || 'Error desconocido')); // Propagar el error para que el suscriptor lo reciba
      })
    ).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
