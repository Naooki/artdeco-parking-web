import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

import { Parking, ParkingLot, ParkingLotStatus } from '../Parking';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
})
export class ParkingComponent implements OnInit {
  parkingConfig$: Observable<Parking>;
  parkingLots$: Observable<ParkingLot[]>;

  parkingsCollection: AngularFirestoreCollection<Parking>;
  parkingsLotsCollection: AngularFirestoreCollection<ParkingLot>;

  private readonly _selectedParkingLotId$ = new BehaviorSubject('');
  selectedParkingLot$ = this._selectedParkingLotId$.pipe(
    switchMap((id) =>
      id
        ? this.parkingsLotsCollection
            .doc(`/${id}`)
            .valueChanges({ idField: 'id' })
        : of(null)
    ),
    share()
  );

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.parkingsCollection = this.afs.collection<Parking>('Parkings');

    this.parkingConfig$ = this.parkingsCollection
      .doc('/0f2a4157-0d08-43b9-98fe-1a3c0b9ccfc2')
      .valueChanges({ idField: 'id' });

    this.parkingsLotsCollection = this.parkingsCollection
      .doc('/0f2a4157-0d08-43b9-98fe-1a3c0b9ccfc2')
      .collection<ParkingLot>('lots');

    this.parkingLots$ = this.parkingsLotsCollection.valueChanges({
      idField: 'id',
    });
  }

  onSelectedParkingLotChange(lot: ParkingLot) {
    this._selectedParkingLotId$.next(lot.id);
  }

  async onBookingToggle(parkingLot: ParkingLot) {
    let status: ParkingLotStatus;
    let userId: string;
    let userEmail: string;
    if (parkingLot.status === ParkingLotStatus.Open) {
      status = ParkingLotStatus.Booked;
      const user = await this.authService.getCurrentUser();
      userId = user.uid;
      userEmail = user.email;
    } else {
      status = ParkingLotStatus.Open;
      userId = null;
      userEmail = null;
    }

    await this.parkingsLotsCollection
      .doc(`/${parkingLot.id}`)
      .update({ status, userId, userEmail });
  }
}
