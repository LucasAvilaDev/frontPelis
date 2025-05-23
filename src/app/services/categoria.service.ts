import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  api = environment.apiUrl+'/categoria'
  private http = inject(HttpClient);

  constructor() { }


  obtenerCategorias(): Observable <any> {
    return this.http.get(this.api)
  }
}


