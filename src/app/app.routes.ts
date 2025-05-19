import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FichaPeliculaComponent } from './components/ficha-pelicula/ficha-pelicula.component';
import { PeliculaFormularioComponent } from './components/pelicula-formulario/pelicula-formulario.component';
import { RoleGuardService } from './guards/role-guard';
import { AuthGuardService } from './guards/auth-guard'; 
  
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuardService]},
  { path: 'pelicula/:id', component: FichaPeliculaComponent, canActivate:[AuthGuardService]},
  { path: 'crear', component: PeliculaFormularioComponent, canActivate:[RoleGuardService], data: { expectedRole: 'admin' }},
  { path: 'editar/:id', component: PeliculaFormularioComponent,  canActivate:[RoleGuardService], data: { expectedRole: 'admin' }},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
 