import { ChatMessage } from './../models/chat-message.model';
import { AngularFireList} from '@angular/fire/database';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from './../services/chat.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  
  feed: ChatMessage[];
  hideWhenNoContact: boolean = false; // Hide contacts data table when no student.
  noData: boolean = false;            // Showing No Contact Message, when no contact in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  

  constructor(private chat: ChatService) { }

  ngOnInit() {
    // console.log('feed initializing...');
    // this.feed = this.chat.getMessages();
    this.dataState(); // Initialize contact's list, when component is ready
    let s = this.chat.getMessages(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.feed = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.feed.push(a as ChatMessage);
      })
    })
  }

  dataState() {     
    this.chat.getMessages().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoContact = false;
        this.noData = true;
      } else {
        this.hideWhenNoContact = true;
        this.noData = false;
      }
    })
  }

  // ngOnChanges() {
  //   this.feed = this.chat.getMessages();
  // }

}
