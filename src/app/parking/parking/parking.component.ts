import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

  selectedParkingLot: ParkingLot = null;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const parkingsCollection = this.afs.collection<any>('Parkings');

    this.parkingConfig$ = parkingsCollection
      .valueChanges({ idField: 'id' })
      .pipe(map((parkings) => parkings[0]));

    this.resetParkingLots();
  }

  async onBookingToggle() {
    let status: ParkingLotStatus;
    let userId: string;
    let userEmail: string;
    if (this.selectedParkingLot.status === ParkingLotStatus.Open) {
      status = ParkingLotStatus.Booked;
      const user = await this.authService.getCurrentUser();
      userId = user.uid;
      userEmail = user.email;
    } else {
      status = ParkingLotStatus.Open;
      userId = null;
      userEmail = null;
    }
    await this.afs
      .doc<ParkingLot>(`ParkingLots/${this.selectedParkingLot.id}`)
      .update({ status, userId, userEmail });
    this.resetParkingLots();
  }

  private resetParkingLots() {
    this.parkingLots$ = this.parkingConfig$.pipe(
      switchMap((parking) =>
        forkJoin(parking.parkingLotIds.map((ref) => ref.get()))
      ),
      map((daos) => daos.map((dao) => ({ id: dao.id, ...dao.data() })))
    );
    this.selectedParkingLot = null;
  }
}
