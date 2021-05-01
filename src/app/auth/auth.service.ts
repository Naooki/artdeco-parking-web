import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _currentUserUpdate$ = new BehaviorSubject<void>(null);
  readonly currentUser$ = this._currentUserUpdate$.pipe(
    switchMap(() => this.angularFireAuth.currentUser)
  );

  constructor(private angularFireAuth: AngularFireAuth) {}

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
