import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // Login method, refering to login method in AuthService
  login() {
    this.authService.login(this.email, this.password)
    .catch(error => this.errorMsg = error.message);
  }
}
