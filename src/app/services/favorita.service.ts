import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritaService {

  api = environment.apiUrl+'/usuario/favorita'

  constructor(
    private http : HttpClient
  ) { }

  obtenerFavoritas(id : any): Observable<any> {
    return this.http.get(environment.apiUrl+'/usuario/'+id+'/favorita')
  }

  agregarFavorita(data : any) {
    return this.http.post(this.api,data)
  }

  eliminarFavorita(data : any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.delete(this.api,{headers : headers , body : data})
  }
}