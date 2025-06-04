import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FichaPeliculaComponent } from './components/ficha-pelicula/ficha-pelicula.component';
import { PeliculaFormularioComponent } from './components/pelicula-formulario/pelicula-formulario.component';
import { RoleGuardService } from './guards/role-guard';
import { AuthGuardService } from './guards/auth-guard';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { FavoritasComponent } from './components/favoritas/favoritas.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminListadoComponent } from './components/admin-listado/admin-listado.component';

export const routes: Routes = [
  {
    path: 'admin', component: AdminDashboardComponent, children: [
      { path: 'crear', component: PeliculaFormularioComponent, canActivate: [RoleGuardService], data: { expectedRole: 'admin' } },
      { path: 'editar/:id', component: PeliculaFormularioComponent, canActivate: [RoleGuardService], data: { expectedRole: 'admin' } },
      { path: 'peliculas',  component: AdminListadoComponent,  canActivate: [RoleGuardService], data: { expectedRole: 'admin' }},
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [AuthGuardService] },
  { path: 'pelicula/:id', component: FichaPeliculaComponent, canActivate: [AuthGuardService] },
  { path: 'favoritas', component: FavoritasComponent, canActivate: [AuthGuardService] },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
