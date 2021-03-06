import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToDashboard) },
  { path: 'register', component: RegisterComponent, ...canActivate(redirectLoggedInToDashboard) },
  { path: '', component: MainComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
