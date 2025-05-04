import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';



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

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({
      nombre: this.nombre,
      correo_electronico: this.correo_electronico,
      password: this.password,
      tipo: this.tipo
    }).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
