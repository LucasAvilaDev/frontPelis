import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  correo_electronico = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ correo_electronico: this.correo_electronico, password: this.password })
      .subscribe({
        next: (res) => {
          console.log(res)
          localStorage.setItem('token', res.token);
          localStorage.setItem('id_usuario', res.id_usuario.toString());
          if (res.tipo === 'admin') {
          this.router.navigate(['/admin']);
          }
          else {
            this.router.navigate(['/home']);
          }
        },
        error: () => {
          this.error = 'Credenciales inválidas';
        }
      })
  }

  
}
