// src/app/home/home.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit { // Implementa OnInit
  peliculas!: Observable<Pelicula[]>; // Declara peliculas$ como Observable
mostrarChat: boolean = true;


  constructor(private router: Router, private peliculaService: PeliculaService) {}

  ngOnInit(): void {
    this.peliculas = this.peliculaService.obtenerPeliculas();
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }

  cerrarChat(): void {
  this.mostrarChat = false;
}
}

