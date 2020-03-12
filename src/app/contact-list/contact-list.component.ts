import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { ContactsService } from "./../services/contacts.service";
import { Contact } from "./../models/contact.model"; // Contact interface class for Data types.
import { ToastrService } from "ngx-toastr"; // Alert message using NGX toastr

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  Contact: Contact[]; // Save contacts data in Contact's array.
  hideWhenNoContact: boolean = false; // Hide contacts data table when no contact.
  noData: boolean = false; // Showing 'No Contact' Message, when no contact in database.
  preLoader: boolean = true; // Showing Preloader to show user data is coming for you from the server

  constructor(
    public contactDB: ContactsService, // Inject contact CRUD services in constructor.
    public toastr: ToastrService, // Toastr service for alert message
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.dataState(); // Initialize contact's list, when component is ready
    let s = this.contactDB.getContactsList();
    s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve
      //  list of data along with metadata($key)
      this.Contact = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a["$key"] = item.key;
        this.Contact.push(a as Contact);
      });
    });
  }

  // Using valueChanges() method to fetch simple list of contacts data.
  // It updates the state of hideWhenNoContact, noData & preLoader variables
  //  when any changes occurs in contact data list in real-time.
  dataState() {
    this.contactDB
      .getContactsList()
      .valueChanges()
      .subscribe(data => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoContact = false;
          this.noData = true;
        } else {
          this.hideWhenNoContact = true;
          this.noData = false;
        }
      });
  }

  // Method to delete contact object
  deleteContact(contact) {
    // Asking from user before Deleting contact data.
    if (window.confirm("Are sure you want to delete this contact ?")) {
      this.contactDB.deleteContact(contact.$key); // Using Delete contact method from ContactsService to delete contact.
      this.toastr.success(contact.name + " successfully deleted!"); // Alert message will show up when contact successfully deleted.
    }
  }
}
