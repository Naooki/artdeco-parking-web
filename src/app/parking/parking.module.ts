import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ParkingViewComponent } from './parking-view/parking-view.component';
import { ParkingLotComponent } from './parking-lot/parking-lot.component';
import { ParkingLotDescComponent } from './parking-lot-desc/parking-lot-desc.component';
import { ParkingComponent } from './parking/parking.component';



@NgModule({
  declarations: [
    ParkingViewComponent,
    ParkingLotComponent,
    ParkingLotDescComponent,
    ParkingComponent
  ],
  imports: [
    CommonModule,
    AngularFirestoreModule,
  ],
  exports: [
    ParkingComponent,
  ]
})
export class ParkingModule { }
