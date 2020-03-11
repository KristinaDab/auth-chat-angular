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

  constructor(private chat: ChatService) { }

  ngOnInit() {
    let messages = this.chat.getMessages(); 
    // Using snapshotChanges() method to retrieve 
    // list of data along with metadata($key):
    messages.snapshotChanges().subscribe(data => { 
      this.feed = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.feed.push(a as ChatMessage);
      })
    })
  }


}
