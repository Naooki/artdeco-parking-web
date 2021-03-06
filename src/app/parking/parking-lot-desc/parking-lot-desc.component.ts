import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as faker from 'faker';
import { pluck } from 'rxjs/operators';
import { hashCode } from 'hashcode';

import { AuthService } from 'src/app/auth/auth.service';
import { ParkingLot } from '../Parking';

@Component({
  selector: 'app-parking-lot-desc',
  templateUrl: './parking-lot-desc.component.html',
  styleUrls: ['./parking-lot-desc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkingLotDescComponent {
  @Input() parkingLot: ParkingLot;
  @Output() bookingToggle = new EventEmitter<ParkingLot>();

  get getBookedBy() {
    if (!this.parkingLot.userId) {
      return '-';
    }
    const seed = hashCode().value(this.parkingLot.userId);
    faker.seed(seed);
    return faker.internet.userName();
  }

  readonly currentUserId$ = this.authService.currentUser$.pipe(pluck('uid'));

  constructor(private authService: AuthService) {}

  onBookingToggle() {
    this.bookingToggle.emit(this.parkingLot);
  }
}
