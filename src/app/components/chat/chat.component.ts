import { Component, NgModule, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  currentMessage: string = '';
  currentUser: string = '';
  selectedUser: string = '';
  chatMessages: { user: string; message: string }[] = [];
  onlineUsers: string[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.currentUser = this.chatService.nombre;

    this.chatService.currentMessage.subscribe((message) => {
      if (message.user && message.message) {
        this.chatMessages.push(message);
      }
    });

    this.chatService.currentActiveUsers.subscribe((users) => {
      if (users) {
        this.onlineUsers = users;
      }
    });
  }

  selectUser(userId: string) {
  this.selectedUser = userId;
  const chatId = this.getChatId(this.currentUser, userId);

  this.chatService.getChatHistory(chatId).then(messages => {
    this.chatMessages = messages;
  });
}

getChatId(user1: string, user2: string): string {
  return [user1, user2].sort().join('_');
}


  sendMessage(): void {
    this.chatService.sendMessage(this.selectedUser, this.currentMessage);
    this.currentMessage = '';
  }

  getFilteredUsers(): string[] {
    return this.onlineUsers.filter((user) => user !== this.currentUser);
  }
}