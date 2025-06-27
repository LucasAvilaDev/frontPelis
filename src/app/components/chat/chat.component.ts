import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() supportUserId: string = '1';
  @Output() closeChatEvent = new EventEmitter<void>();

  currentMessage: string = '';
  chatMessages: { user: string, message: string, chatId: string }[] = [];
  currentUser: string = '';

  constructor(private chatService: ChatService) {}

  async ngOnInit(): Promise<void> {
    this.currentUser = this.chatService.userId;
    const chatId = this.getChatId(this.currentUser, this.supportUserId);

    await this.chatService.ensureConnectionStarted(); // <-- Esto evita el error

    this.chatService.getChatHistory(chatId).then(history => {
      this.chatMessages = history;
    });

    this.chatService.currentMessage$.subscribe(msg => {
      if (msg && msg.chatId === chatId) {
        this.chatMessages.push(msg);
      }
    });
  }

  async sendMessage(): Promise<void> {
    const text = this.currentMessage.trim();
    if (!text) return;

    await this.chatService.ensureConnectionStarted(); // también acá, por si se reconectó
    this.chatService.sendMessage(this.supportUserId, text);
    this.currentMessage = '';
  }

  getChatId(user1: string, user2: string): string {
    return [user1, user2].sort().join('_');
  }

  closeChat(): void {
    this.closeChatEvent.emit();
  }
}
