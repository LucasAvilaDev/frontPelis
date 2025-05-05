// src/app/components/pelicula-formulario.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';

@Component({
  selector: 'app-pelicula-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pelicula-formulario.component.html',
})
export class PeliculaFormularioComponent {
  peliculaService = inject(PeliculaService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  pelicula: Pelicula = {
    id_pelicula: 0,
    titulo: '',
    descripcion: '',
    director: '',
    duracion: 0,
    anio: 0,
    fotoPelicula: '',
    id_categoria: 0
  };
  esEdicion = false;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.esEdicion = true;
      this.peliculaService.getMovie(id).subscribe(data => this.pelicula = data);
    }
  }

  guardar() {
    console.log('Guardando...', this.pelicula);
    const obs = this.esEdicion
      ? this.peliculaService.actualizarPelicula(this.pelicula.id_pelicula, this.pelicula)
      : this.peliculaService.agregarPelicula(this.pelicula);

    obs.subscribe(() => this.router.navigateByUrl('/'));
  }

  volver() {
    this.router.navigateByUrl('/');
  }
}
