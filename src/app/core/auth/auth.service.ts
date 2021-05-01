import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _currentUser$ = new BehaviorSubject(true);
  readonly currentUser$ = this._currentUser$.asObservable();

  constructor() { }


  login() {
    this._currentUser$.next(true);
  }

  logout() {
    this._currentUser$.next(true);
  }
}
