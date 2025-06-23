import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection: signalR.HubConnection;
  private messageSource = new BehaviorSubject<{ user: string; message: string }>({ user: '', message: '' });
  private activeUsers = new BehaviorSubject<string[]>([]);
  currentMessage = this.messageSource.asObservable();
  currentActiveUsers = this.activeUsers.asObservable();

  public userId: string;
  public nombre: string;

  constructor() {
    this.userId = localStorage.getItem('id_usuario') || '';
    this.nombre = localStorage.getItem('nombre') || '';

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5080/chatHub?userId=${this.userId}`)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.requestActiveUsers();
      })
      .catch((err) => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messageSource.next({ user, message });
    });

    this.hubConnection.on('MessageSentConfirmation', (receiverId: string, message: string, chatId: string) => {
  this.messageSource.next({ user: this.userId, message });
});


    this.hubConnection.on('ActiveUsers', (userIds: string[]) => {
      this.activeUsers.next(userIds);
    });
  }

  sendMessage(receiverId: string, message: string) {
    this.hubConnection
      .invoke('SendMessage', this.userId, receiverId, message)
      .catch((err) => console.error(err));
  }

  requestActiveUsers() {
    this.hubConnection
      .invoke('GetActiveUsers')
      .catch((err) => console.error(err));
  }

  getChatHistory(chatId: string): Promise<{ user: string; message: string }[]> {
  return this.hubConnection
    .invoke('GetChatHistory', chatId)
    .then((messages: any[]) => {
      return messages.map(m => ({
        user: m.remitente,
        message: m.contenido
      }));
    });
}

}
