import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  errorMsg: string = null;

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit() {
    try {
      await this.authService.signIn(this.authForm.value);
      this.router.navigate([''], { replaceUrl: true });
    } catch (e) {
      this.errorMsg =  e;
    }
  }
}
