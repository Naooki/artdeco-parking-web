import { AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Parking {
  id: string;
  width: number;
  height: number;
  parkingLotIds: AngularFirestoreDocument<ParkingLot>[];
}

export interface ParkingLot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  status: 'OPEN' | 'BOOKED' | 'UNAVAILABLE';
  userId: string | null;
}
