import { Component, OnInit } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-listado',
  imports: [RouterLink,CommonModule, RouterModule],
  templateUrl: './admin-listado.component.html',
  styleUrl: './admin-listado.component.css'
})
export class AdminListadoComponent implements OnInit {
  peliculas: any[] = [];

  constructor(private peliculaService: PeliculaService, private router: Router) {}

  ngOnInit() {
    this.peliculaService.obtenerPeliculas().subscribe(data => {
      this.peliculas = data;
    });
  }

  editarPelicula(id: number) {
    this.router.navigate(['/admin/editar', id]);
  }

  eliminarPelicula(id: number) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      return;
    }
    this.peliculaService.eliminarPelicula(id).subscribe(() => {
      this.peliculas = this.peliculas.filter(p => p.id !== id);
    });
  }
}

