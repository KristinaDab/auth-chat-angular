import { Component, OnInit } from '@angular/core';
import { ChatService } from './../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message:string;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  // Send a message through ChatService sendMessage method
  send() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  // On enter (key 13) also activate send() method
  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
