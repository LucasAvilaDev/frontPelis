import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from './models/login-request.model';
import { JwtHelperService } from '@auth0/angular-jwt'; // 👈 importá esto


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5080/api/auth'; // ajustá al puerto correcto
  private jwtHelper = new JwtHelperService(); // 👈 inicializalo así

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, data);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    
    return !this.jwtHelper.isTokenExpired(token);
  }
}
