import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {

  // ElementRef will give access to underlying DOM element
  // @ViewChild will give access to the template reference we have
  // in the template
  @ViewChild('scroller') private feedContainer: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  // This method will be called after ngAfterViewChecked() method
  // and will scroll to the bottom of messages, so we can see the newest

  scrollToBottom() : void {
    // Element.scrollTop gets or sets the number of pixels that
    // an element's content is scrolled vertically.

    // Element.scrollHeight read-only property to get the height
    // of an element's content, including overflow
    this.feedContainer.nativeElement.scrollTop 
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class. (Check Lifecycle Hooks)
    this.scrollToBottom();
  }
}
