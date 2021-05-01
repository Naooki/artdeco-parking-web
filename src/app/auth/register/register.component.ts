import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { passwordMatchValidator } from './password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  readonly authForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormGroup({
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    }, [passwordMatchValidator()]),
  });

  errorMsg: string = null;

  get emailFormControl() {
    return this.authForm.get('email');
  }

  get passwordFormGroup() {
    return this.authForm.get('password');
  }

  get password1FormControl() {
    return this.authForm.get('password.password1');
  }

  get password2FormControl() {
    return this.authForm.get('password.password2');
  }

  constructor(private router: Router, private authService: AuthService) {}

  async onSubmit() {
    const [email, password] = [
      this.authForm.value.email,
      this.authForm.value.password.password1,
    ];
    try {
      await this.authService.signUp({ email, password });
      this.router.navigate([''], { replaceUrl: true });
    } catch (e) {
      this.errorMsg = e;
    }
  }
}
