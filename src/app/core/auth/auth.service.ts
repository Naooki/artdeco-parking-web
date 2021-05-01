import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _currentUser$ = new BehaviorSubject(true);
  readonly currentUser$ = this._currentUser$.asObservable();

  constructor(private angularFireAuth: AngularFireAuth) { }


  signIn({ email, password }: { email: string; password: string }) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signUp({ email, password }: { email: string; password: string }) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }
}
