import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pelicula } from '../../models/pelicula.model';
import { PeliculaService } from '../../services/pelicula.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatGrupalComponent } from '../chat-grupal/chat-grupal.component';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-ficha-pelicula',
  templateUrl: './ficha-pelicula.component.html',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ChatGrupalComponent // Asegúrate de que esté aquí
  ],
  styleUrls: ['./ficha-pelicula.component.css']
})
export class FichaPeliculaComponent implements OnInit {
  pelicula: Pelicula | undefined;
  genero: string = '';
  public userId = localStorage.getItem('id_usuario') ?? '';


  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.peliculaService.getMovie(id).subscribe(
      (data) => {
        this.pelicula = data;
        this.categoriaService.obtenerCategoriaPorId(this.pelicula.id_categoria).subscribe(
          (categoria) => {
            this.genero = categoria.nombre;
            console.log('Género de la película:', this.genero);
          }
        );
      },
      (error: any) => {
        console.error('Error al obtener la película', error);
      }
    );
  }
}

