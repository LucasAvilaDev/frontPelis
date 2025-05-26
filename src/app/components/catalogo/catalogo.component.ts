import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';
import { FavoritaService } from '../../services/favorita.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
peliculas$: Observable<(Pelicula & { favorita: boolean })[]> = new Observable();
  usuario: any = null;

  constructor(
    private peliculaService: PeliculaService,
    private favoritaService: FavoritaService
  ) {}

  ngOnInit(): void {
    this.usuario = localStorage.getItem('id_usuario');
    console.log(this.usuario);
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    const peliculas$ = this.peliculaService.obtenerPeliculas();
const favoritas$ = this.favoritaService.obtenerFavoritas(Number(this.usuario));

    this.peliculas$ = combineLatest([peliculas$, favoritas$]).pipe(
      map(([peliculas, favoritas]) =>
        peliculas.map(p => ({
          ...p,
          favorita: favoritas.some((f: { id_pelicula: number; }) => f.id_pelicula === p.id_pelicula)
        }))
      )
    );
  }

  toggleFavorita(pelicula: Pelicula & { favorita: boolean }): void {
    const payload = {
      id_usuario: this.usuario,
      id_pelicula: pelicula.id_pelicula
    };

    const accion = pelicula.favorita
      ? this.favoritaService.eliminarFavorita(payload)
      : this.favoritaService.agregarFavorita(payload);

    accion.subscribe(() => this.cargarPeliculas());
  }
}
