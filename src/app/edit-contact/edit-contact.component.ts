import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactsService } from './../services/contacts.service';

import { ActivatedRoute, Router } from "@angular/router"; 
import { Location } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})

export class EditContactComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to contact's edit form

  constructor(
    private contactDB: ContactsService, 
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.updateContactData();   // Call updateContactData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.contactDB.getContact(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }

  // Accessing form control using getters
  get name() {
    return this.editForm.get('name');
  }

  get address() {
    return this.editForm.get('address');
  }

  get email() {
    return this.editForm.get('email');
  }

  get avatar() {
    return this.editForm.get('avatar');
  }  

  // Contains Reactive Form logic
  updateContactData() {
    this.editForm = this.fb.group({
      name: [''],
      address: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      avatar: [''],
      userId: ['']
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.contactDB.updateContact(this.editForm.value);       // Update contact data using contactDB
    this.toastr.success(this.editForm.controls['name'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['view-contacts']);               // Navigate to contact's list page when contact data is updated
  }

}
