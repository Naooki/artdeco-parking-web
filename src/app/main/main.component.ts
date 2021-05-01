import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  readonly currentUserEmail$ = this.authServce.currentUser$.pipe(
    map((user) => user.email)
  );

  constructor(private router: Router, private authServce: AuthService) {}

  async onLogoutClick() {
    await this.authServce.logout();
    this.router.navigate(['login']);
  }
}
