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
  public loggedIn = false;
  userData: firebase.User;

  constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private router: Router) { 
          this.user = afAuth.authState;
           /* Saving user data in localstorage when 
              logged in and setting up null when logged out */
          this.afAuth.authState.subscribe(user => {
            if (user) {
              this.userData = user;
              localStorage.setItem('user', JSON.stringify(this.userData));
              JSON.parse(localStorage.getItem('user'));
            } else {
              localStorage.setItem('user', null);
              JSON.parse(localStorage.getItem('user'));
            }
          })
     }

    authUser() {
      return this.user;
    }

    get currentUserId(): string {
      var currentUser = firebase.auth().currentUser;
      return this.authState !== null ? currentUser.uid : '';
    }

    login(email: string, password: string) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.setUserStatus('online');
          this.router.navigate(['chat']);
        });
    }

    logout() {
      this.setUserStatus('offline');
      return firebase.auth().signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      });
      
      
    }

    signUp(email: string, password: string, displayName: string) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((user) => {
                this.authState = user;
                const status = 'online';
                this.setUserData(email, displayName, status);
              }).catch(error => console.log(error));
    }

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


    setUserStatus(status: string): void {
      const path = `users/${this.currentUserId}`;

      const data = {
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }
}

