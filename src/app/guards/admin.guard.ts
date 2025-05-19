import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BrowserStorageService } from '../services/browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,private storage: BrowserStorageService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificarRol();
  }

  private verificarRol(): boolean | UrlTree {
  const token = this.storage.get('token');
  if (!token) {
    this.router.navigate(['/home']);
    return false;
  }

  try {
    // Los JWT tienen 3 partes separadas por '.'
    // El payload es la parte 2, codificada en base64
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    if (payload.rol === 'admin') {
      return true;
    }
  } catch (error) {
    console.error('Error al decodificar token:', error);
  }

  this.router.navigate(['/home']);
  return false;
}

}