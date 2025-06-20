// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messageSubject = new Subject<any>();

  constructor() {
    // NO crear aquí la conexión aún
  }

  startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5080/chatHub')
      .withAutomaticReconnect()
      .build();

    // Configurar los eventos después de construir la conexión
    this.hubConnection.on('RecibirMensaje', (chatId: string, remitente: string, mensaje: string) => {
      this.messageSubject.next({ chatId, remitente, mensaje });
    });

    this.hubConnection.onclose(error => {
      console.error('Conexión SignalR cerrada:', error);
    });

    return this.hubConnection.start()
      .then(() => {
        console.log('✅ SignalR Hub Connection Started!');
      })
      .catch(err => {
        console.error('❌ Error al iniciar conexión SignalR:', err);
      });
  }

  public unirseChat(chatId: string): Promise<void> {
    return this.hubConnection.invoke('UnirseChat', chatId)
      .catch(err => console.error('Error al unirse al chat:', err));
  }

  public enviarMensaje(chatId: string, remitente: string, mensaje: string): Promise<void> {
    return this.hubConnection.invoke('EnviarMensaje', chatId, remitente, mensaje)
      .catch(err => console.error('Error al enviar mensaje:', err));
  }

  public onMensajeRecibido(callback: (mensaje: any) => void): void {
    this.messageSubject.asObservable().subscribe(callback);
  }

  public stopConnection(): Promise<void> {
    return this.hubConnection.stop();
  }
}
