// src/app/models/pelicula.model.ts
export interface Pelicula {
    id: string;
    titulo: string;
    descripcion: string;
    director: string;
    anio: number;
    duracion: number;
    imagenUrl: string;
    id_categoria: number;

  }
