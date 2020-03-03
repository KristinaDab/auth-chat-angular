import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import 'firebase/database';
import { Contact } from './../models/contact.model';


@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  contactsRef : AngularFireList<any>; // Reference to Contact data list, its an Observable
  contactRef: AngularFireObject<any>;  // Reference to Contact object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Contact
  AddContact(contact: Contact) {
    this.contactsRef.push({
      name: contact.name,
      address: contact.address,
      email: contact.email,
      avatar: contact.avatar,
      userId: contact.userId
    })
  }

  // Fetch Single Contact Object
  GetContact(id: string) {
    this.contactRef = this.db.object('contacts-list/' + id);
    return this.contactRef;
  }

  // Fetch Contact List
  GetContactsList() {
    this.contactsRef = this.db.list('contacts-list');
    return this.contactsRef;
  }  

  // Update Contact Object
  UpdateContact(contact: Contact) {
    this.contactRef.update({
      name: contact.name,
      address: contact.address,
      email: contact.email,
      avatar: contact.avatar
    })
  }  

  // Delete Student Object
  DeleteContact(id: string) { 
    this.contactRef = this.db.object('contacts-list/'+id);
    this.contactRef.remove();
  }
}
