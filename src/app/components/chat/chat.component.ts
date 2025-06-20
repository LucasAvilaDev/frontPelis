import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  mensaje: string = '';
  mensajes: any[] = [];
  private connectionStarted: boolean = false; // <-- Nueva bandera

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
  this.chatService.startConnection().then(() => {
    const chatId = 'chat123'; // o desde la ruta
    this.chatService.unirseChat(chatId);

    this.chatService.onMensajeRecibido((mensaje) => {
      this.mensajes.push(mensaje);
    });
  });
}


  enviar() {
    // Solo enviar si la conexión está iniciada
    if (this.connectionStarted && this.mensaje.trim()) {
      const remitente = 'cliente'; // o 'admin', según el rol
      const chatId = 'chat123'; // Asegúrate de usar el mismo ID de chat
      this.chatService.enviarMensaje(chatId, remitente, this.mensaje);
      this.mensaje = '';
    } else if (!this.connectionStarted) {
      console.warn('Conexión SignalR no establecida. No se puede enviar el mensaje.');
      // Podrías deshabilitar el botón de enviar o mostrar un spinner
    }
  }
}