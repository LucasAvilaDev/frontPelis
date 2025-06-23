import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGrupalService {
  private hubConnection!: signalR.HubConnection;
  private mensajeSubject = new Subject<any>();

  public conectar(userId: string): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5080/chatHub?userId=${userId}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.on('RecibirMensaje', (remitente: string, contenido: string, chatId: string) => {
      this.mensajeSubject.next({ remitente, contenido, chatId, timestamp: new Date().toISOString() });
    });

    return this.hubConnection.start().then(() => {
      console.log('✅ Conexión SignalR iniciada');
    }).catch(err => console.error('❌ Error al conectar SignalR', err));
  }

  unirseAGrupo(chatId: string) {
    return this.hubConnection.invoke('UnirseAGrupo', chatId);
  }

  enviarMensaje(chatId: string, remitente: string, contenido: string) {
    return this.hubConnection.invoke('EnviarMensajeAGrupo', chatId, remitente, contenido);
  }

  onMensaje(callback: (msg: any) => void) {
    this.mensajeSubject.asObservable().subscribe(callback);
  }
}
