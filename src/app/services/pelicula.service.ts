// src/app/services/pelicula.service.ts
import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  private apiUrl = 'http://localhost:5080/api/pelicula'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {} // Inyecta HttpClient

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getMovie(id: number): Observable<Pelicula> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Pelicula>(url);
  }

  agregarPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula);
  }

  actualizarPelicula(id: number, pelicula: Pelicula): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, pelicula);
  }

  eliminarPelicula(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}