import { Component, OnInit } from '@angular/core';
import { ContactsService } from './../services/contacts.service';
import { Contact } from './../models/contact.model';  // Contact interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  Contact: Contact[];                 // Save contacts data in Contact's array.
  hideWhenNoContact: boolean = false; // Hide contacts data table when no student.
  noData: boolean = false;            // Showing No Contact Message, when no contact in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  

  constructor(
    public dbApi: ContactsService, // Inject contact CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    ){ }


  ngOnInit() {
    this.dataState(); // Initialize contact's list, when component is ready
    let s = this.dbApi.GetContactsList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Contact = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Contact.push(a as Contact);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of contacts data. It updates the state of hideWhenNoContact, noData & preLoader variables when any changes occurs in contact data list in real-time.
  dataState() {     
    this.dbApi.GetContactsList().valueChanges().subscribe(data => {
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

  // Method to delete contact object
  deleteContact(contact) {
    if (window.confirm('Are sure you want to delete this contact ?')) { // Asking from user before Deleting contact data.
      this.dbApi.DeleteContact(contact.$key) // Using Delete student API to delete contact.
      this.toastr.success(contact.name + ' successfully deleted!'); // Alert message will show up when contact successfully deleted.
    }
  }

}