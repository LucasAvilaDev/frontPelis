import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FichaPeliculaComponent } from './components/ficha-pelicula/ficha-pelicula.component';
import { PeliculaFormularioComponent } from './components/pelicula-formulario/pelicula-formulario.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pelicula/:id', component: FichaPeliculaComponent },
  { path: 'crear', component: PeliculaFormularioComponent },
  { path: 'editar/:id', component: PeliculaFormularioComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
 