import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ChatGrupalService } from '../../services/chat-grupal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-grupal',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-grupal.component.html',
  styleUrls: ['./chat-grupal.component.css']
})
export class ChatGrupalComponent implements OnInit {
  mensajes: any[] = [];
  mensaje: string = '';
  @Input() chatId: string = '';
  @Input() remitente: string = '';

  constructor(private chatService: ChatGrupalService) {}

 async ngOnInit() {
  await this.chatService.conectar(this.remitente);
  await this.chatService.unirseAGrupo(this.chatId);

  this.chatService.onMensaje((msg) => {
    if (msg.chatId === this.chatId) {
      this.mensajes.push(msg);
    }
  });
}


  enviar() {
    if (this.mensaje.trim()) {
      this.chatService.enviarMensaje(this.chatId, this.remitente, this.mensaje);
      this.mensaje = '';
    }
  }
}
