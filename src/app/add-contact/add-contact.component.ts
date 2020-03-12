import { Component, OnInit } from '@angular/core';
import { ContactsService } from './../services/contacts.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { Location } from '@angular/common';  
import { AuthService } from './../services/auth.service';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})

export class AddContactComponent implements OnInit {
  public contForm: FormGroup;  // Define FormGroup to contact's form
 
  constructor(
    public contactDB: ContactsService,  // CRUD contact service
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    public toastr: ToastrService,  // Toastr service for alert message
    public auth: AuthService
  ) { }

 
  ngOnInit() {
    this.contactDB.getContactsList();  // Call GetContactsList() before main form is being called
    this.contactForm();              // Call contact form method when component is ready
  }

  // Reactive contact form
  contactForm() {
    this.contForm = this.fb.group({
      name: [''],
      address: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      avatar: [''],
      userId: [this.auth.currentUserId]
    })  
  }

  // Accessing form control using getters
  get name() {
    return this.contForm.get('name');
  }

  get address() {
    return this.contForm.get('address');
  }  

  get email() {
    return this.contForm.get('email');
  }

  get avatar() {
    return this.contForm.get('avatar');
  }

  get userId() {
    return this.contForm.get('userId');
  }

  // Reset contact form's values
  ResetForm() {
    this.contForm.reset();
  }  

  // Submit contact data to the database
  submitContactData() {
    this.contactDB.addContact(this.contForm.value); // Submit contact data using ContactsService
    this.toastr.success(this.contForm.controls['name'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    console.log(this.auth.currentUserId);
   };

  // Go back to previous component
  goBack() {
    this.location.back();
  }

}