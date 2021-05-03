import { AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Parking {
  id: string;
  width: number;
  height: number;
  parkingLotIds: AngularFirestoreDocument<ParkingLot>[];
}

export const enum ParkingLotStatus {
  Open = 'open',
  Booked = 'booked',
  Unavailable = 'unavailable',
}

export interface ParkingLot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  status: ParkingLotStatus;
  userId: string | null;
  userEmail?: string | null;
}
