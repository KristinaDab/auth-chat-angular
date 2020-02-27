import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { ChatMessage } from './../models/chat-message.model';


import 'firebase/database';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  user: firebase.User;
  userRef: AngularFireObject<any>;
  usersRef: AngularFireList<any>;

  chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  userName: Observable<string>;


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private actRoute: ActivatedRoute, 
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if(auth != undefined && auth !== null) {
        this.user = auth;
      }

      const id = this.actRoute.snapshot.paramMap.get('id');
      this.getUser(id).valueChanges().subscribe(a => {
        this.userName = a.displayName;
      })
    })

  }

  // Get user that is currently authenticated
  getUser(id: string) {
    id = this.user.uid;
    this.userRef = this.db.object('users/' + id);
    return this.userRef;
  }

  getUsers() {
    this.usersRef = this.db.list('users');
    return this.usersRef;
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: email });
      console.log('Message sent');
  }

  getMessages(): AngularFireList<any> {
    console.log('Calling getMessages()')
    return this.db.list('messages', ref => {
      return ref.limitToLast(25).orderByKey()
    });
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
