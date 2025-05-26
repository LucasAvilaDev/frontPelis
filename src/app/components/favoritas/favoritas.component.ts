import { Component, OnInit } from '@angular/core';
import { FavoritaService } from '../../services/favorita.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favoritas',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './favoritas.component.html',
  styleUrls: ['./favoritas.component.css']
})
export class FavoritasComponent implements OnInit {

  favoritas: any[] = [];
  cargando: boolean = true;

  constructor(
    private favoritaService: FavoritaService,
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('id_usuario');

    this.favoritaService.obtenerFavoritas(userId).subscribe({
      next: (data) => {
        this.favoritas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener favoritas:', err);
        this.cargando = false;
      }
    });
  }

}

