import { Injectable } from '@angular/core';

import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth/auth.service';

interface MyJwtPayload {
  sub: string;
  role: string; // o 'tipo' si así lo definiste en el token
  exp: number;
  iat?: number;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
}

@Injectable(
  {  providedIn: 'root'
}
)
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
      this.router.navigate(['login']);
      return false;
    }

    const tokenPayload = jwtDecode<MyJwtPayload>(token);
    console.log(jwtDecode(token));

    const actualRoleInToken = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log('RoleGuardService: actualRoleInToken:', actualRoleInToken);
    console.log('RoleGuardService: expectedRole:', expectedRole);

    if (
      !this.auth.isAuthenticated() || 
      actualRoleInToken !== expectedRole // o tokenPayload.tipo
    ) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
