import { ChatroomComponent } from './chatroom/chatroom.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';

// Using AngularFireAuthGuard to allow or not allow users to access specific pages based
// on if they are logged in or not 

const redirectUnauthorizedToLogin= () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToChat = () => redirectLoggedInTo(['chat']);

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'signup', component: SignupFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToChat }},
  {path: 'login', component: LoginFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToChat }},
  {path: 'chat', component: ChatroomComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
