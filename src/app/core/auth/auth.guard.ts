import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (route.routeConfig.path === 'login') {
      return this.authService.currentUser$.pipe(map((user) => {
        if (user) {
          this.router.navigate([''], { replaceUrl: true });
          return false;
        }
        return true;
      }));
    }
    return this.authService.currentUser$.pipe(map((user) => {
      if (!user) {
        this.router.navigate(['login'], { replaceUrl: true });
        return false;
      }
      return true;
    }));
  }
}
