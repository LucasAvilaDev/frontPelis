// src/app/home/home.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit { // Implementa OnInit
  peliculas!: Observable<Pelicula[]>; // Declara peliculas$ como Observable

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.peliculas = this.peliculaService.obtenerPeliculas();
  }
}

