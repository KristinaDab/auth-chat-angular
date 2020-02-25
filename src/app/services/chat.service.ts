import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { ChatMessage } from './../models/chat-message.model';


import 'firebase/database';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  userName: Observable<string>;


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if(auth != undefined && auth !== null) {
        this.user = auth;
      }

      // this.getUser().subscribe(a => {
      //   this.userName = a.displayName;
      // })
    })

  }

  // getUser() {
  //   const userId = this.user.uid;
  //   const path = `/users/${userId}`;
  //   return this.db.object(path);
  // }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'test@example.com';

    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      // userName: this.userName,
      userName: 'test-userName',
      email: email });
      console.log('Message sent');
  }

  getMessages(): AngularFireList<any> {
    console.log('Calling getMessages()')
    return this.db.list('messages', ref => {
      return ref.limitToLast(25).orderByKey()
    });
    // this.chatMessages= this.db.list('messages');
    // return this.chatMessages;
  }

  getTimeStamp() {
    const now = new Date();
    const date  = now.getUTCFullYear() + '/' + 
                  (now.getUTCMonth() + 1) + '/' +
                  now.getUTCDate();
    const time  = now.getUTCHours() + ':' + 
                  now.getUTCMinutes() + ':' +
                  now.getUTCSeconds();
    return (date + ' ' + time);
  }
  
}
