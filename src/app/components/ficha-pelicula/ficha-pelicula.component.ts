import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ficha-pelicula',
  templateUrl: './ficha-pelicula.component.html',
  imports: [
    RouterModule,
    CommonModule, // Asegúrate de que esté aquí
  ],
  styleUrls: ['./ficha-pelicula.component.css']
})
export class FichaPeliculaComponent implements OnInit {
  pelicula: Pelicula | undefined;

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.peliculaService.getMovie(id).subscribe(
      (data) => {
        this.pelicula = data;
      },
      (error) => {
        console.error('Error al obtener la película', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }
}