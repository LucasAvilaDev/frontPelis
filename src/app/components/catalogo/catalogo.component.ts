import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule,RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit { // Implementa OnInit
  peliculas!: Observable<Pelicula[]>; // Declara peliculas$ como Observable
  
    constructor(private peliculaService: PeliculaService) {}
  
    ngOnInit(): void {
      this.peliculas = this.peliculaService.obtenerPeliculas();
    }
}
