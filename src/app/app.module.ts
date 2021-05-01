import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ParkingModule } from './parking/parking.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AuthModule,
    ParkingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
