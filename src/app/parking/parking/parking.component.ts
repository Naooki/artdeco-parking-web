import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Parking, ParkingLot } from '../Parking';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  parkingConfig$: Observable<Parking>;
  parkingLots$: Observable<ParkingLot[]>;

  selectedParkingLot: ParkingLot = null;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    const parkingsCollection = this.afs.collection<any>('Parkings');

    this.parkingConfig$ = parkingsCollection
      .valueChanges({ idField: 'id' })
      .pipe(map((parkings) => parkings[0]));

    this.parkingLots$ = this.parkingConfig$.pipe(
      switchMap((parking) =>
        forkJoin<ParkingLot>(
          parking.parkingLotIds.map((ref) =>
            (ref.get() as any).then((res) => res.data())
          )
        )
      )
    );
  }
}
