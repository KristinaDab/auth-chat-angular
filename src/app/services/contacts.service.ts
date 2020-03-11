import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import 'firebase/database';
import { Contact } from './../models/contact.model';


@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  contactsRef : AngularFireList<any>; 
  contactRef: AngularFireObject<any>; 

  constructor(private db: AngularFireDatabase) { }

  // Create Contact
  addContact(contact: Contact) {
    this.contactsRef.push({
      name: contact.name,
      address: contact.address,
      email: contact.email,
      avatar: contact.avatar,
      userId: contact.userId
    })
  }

  // Fetch Single Contact Object
  getContact(id: string) {
    this.contactRef = this.db.object('contacts-list/' + id);
    return this.contactRef;
  }

  // Get Contact List
  getContactsList() {
    this.contactsRef = this.db.list('contacts-list');
    return this.contactsRef;
  }  

  // Update Contact Object
  updateContact(contact: Contact) {
    this.contactRef.update({
      name: contact.name,
      address: contact.address,
      email: contact.email,
      avatar: contact.avatar
    })
  }  

  // Delete Contact Object
  deleteContact(id: string) { 
    this.contactRef = this.db.object('contacts-list/'+id);
    this.contactRef.remove();
  }
}
