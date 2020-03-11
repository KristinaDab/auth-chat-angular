import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs';
import { User } from './../models/user.model';
import 'firebase/database';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: Observable<firebase.User>;
  private authState: any;
  userData: firebase.User;

  constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private router: Router) { 
          this.user = afAuth.authState;
     }

    authUser() {
      return this.user;
    }

    // Get the uid of the current signed-in user
    get currentUserId(): string {
      var currentUser = firebase.auth().currentUser;
      return this.authState !== null ? currentUser.uid : '';
    }

    // Log in with email and password, updating user auth state and
    // setting user status to 'online'
    login(email: string, password: string) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.setUserStatus('online');
          this.router.navigate(['chat']);
        });
    }

    // Log out setting user status 'offline'
    logout() {
      this.setUserStatus('offline');
      return firebase.auth().signOut().then(() => {
        this.router.navigate(['login']);
      });
      
      
    }
    // Sign-up wiht email, password and displayName, update user authState
    //  with a new logged-in user, set status 'online' and setUserData to 
    //  save a new user to the database 
    signUp(email: string, password: string, displayName: string) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((user) => {
                this.authState = user;
                const status = 'online';
                this.setUserData(email, displayName, status);
              }).catch(error => console.log(error));
    }

    // Saves newly signed up user object to the database with current user id 
    setUserData(email: string, displayName: string, status: string): void {
      const path = `users/${this.currentUserId}`;
      const data = {
        email: email,
        displayName: displayName,
        status: status
      };
      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    // Set user status 'online' or 'offline' 
    setUserStatus(status: string): void {
      const path = `users/${this.currentUserId}`;
      const data = {
        status: status
      };
      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }
}

