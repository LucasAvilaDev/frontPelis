import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from '../chat/chat.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet, RouterLink, FormsModule, ChatComponent, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

    activeUsers: string[] = [];
  chatsAbiertos: string[] = [];
  adminId = localStorage.getItem('id_usuario') ?? '';

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    this.chatService.currentUsers$.subscribe(users => {
      // Excluir al admin
      this.activeUsers = users.filter(u => u !== this.adminId);
    });
  }

  abrirChatCon(userId: string) {
    if (!this.chatsAbiertos.includes(userId)) {
      this.chatsAbiertos.push(userId);
    }
  }

  cerrarChat(userId: string) {
    this.chatsAbiertos = this.chatsAbiertos.filter(id => id !== userId);
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
