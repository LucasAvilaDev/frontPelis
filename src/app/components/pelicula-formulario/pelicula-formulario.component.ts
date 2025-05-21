// src/app/components/pelicula-formulario.component.ts
import { Component, inject, OnInit } from '@angular/core'; // Importa OnInit
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-pelicula-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pelicula-formulario.component.html',
})
export class PeliculaFormularioComponent implements OnInit { // Implementa OnInit
  peliculaService = inject(PeliculaService);
  categoriaService = inject(CategoriaService);
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
  categorias : any[] = []; // Inicializa como un array vacío para evitar errores de tipo si no hay datos inicialmente


  ngOnInit() {
    // Llama a obtenerCategorias() siempre, para que estén disponibles tanto en creación como en edición
    this.obtenerCategorias();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.esEdicion = true;
      this.peliculaService.getMovie(id).subscribe(data => {
        this.pelicula = data;
        // Si la película se carga después de las categorías, asegúrate de que el select se actualice
        // Esto es automático con [(ngModel)] si pelicula.id_categoria coincide con una opción
      });
    }
  }

  guardar() {
    const obs = this.esEdicion
      ? this.peliculaService.actualizarPelicula(this.pelicula.id_pelicula, this.pelicula)
      : this.peliculaService.agregarPelicula(this.pelicula);

    obs.subscribe(() => this.router.navigateByUrl('/home'));
  }

  obtenerCategorias(){
    this.categoriaService.obtenerCategorias().subscribe(
      {
      next: (categoria) => {
        this.categorias = categoria;
      },
      error: (error) => {
        console.error(error);
      }
    }
    )
  }

  volver() {
    this.router.navigateByUrl('/home');
  }
}