import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { ChatService } from './../services/chat.service';
import { ChatMessage } from './../models/chat-message.model';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // this property is bound to the ChatMessage model:
  @Input() chatMessage: ChatMessage;

  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;

  // Watching for changes on users email. Based on current users email
  // we will identify and change styles later for that users messages

  constructor(private authService: AuthService) { 
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    })
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;


  }

}
