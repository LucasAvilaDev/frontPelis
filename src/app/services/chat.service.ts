import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messageSource = new BehaviorSubject<{ user: string, message: string, chatId: string } | null>(null);
  private usersSource = new BehaviorSubject<string[]>([]);

  public currentMessage$ = this.messageSource.asObservable();
  public currentUsers$ = this.usersSource.asObservable();

  public userId = localStorage.getItem('id_usuario') ?? '';

  constructor() {
    this.initConnection();
  }

  private initConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5080/chatHub?userId=${this.userId}`)
      .build();

    this.hubConnection.start().then(() => {
      console.log('Connected to SignalR');
      this.requestActiveUsers();
    }).catch(err => console.error('Connection failed', err));

    this.hubConnection.on('ReceiveMessage', (user: string, message: string, chatId: string) => {
      this.messageSource.next({ user, message, chatId });
    });

    this.hubConnection.on('MessageSentConfirmation', (receiverId: string, message: string, chatId: string) => {
      this.messageSource.next({ user: this.userId, message, chatId });
    });

    this.hubConnection.on('ActiveUsers', (userIds: string[]) => {
      this.usersSource.next(userIds);
    });
  }

  sendMessage(receiverId: string, message: string) {
    return this.hubConnection.invoke('SendMessage', this.userId, receiverId, message);
  }

  getChatHistory(chatId: string): Promise<{ user: string; message: string; chatId: string }[]> {
    return this.hubConnection.invoke('GetChatHistory', chatId)
      .then((messages: any[]) => messages.map(m => ({
        user: m.remitente,
        message: m.contenido,
        chatId
      })));
  }

  async ensureConnectionStarted(): Promise<void> {
  if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
    await this.hubConnection.start();
  }
}

  requestActiveUsers() {
    return this.hubConnection.invoke('GetActiveUsers');
  }
}
