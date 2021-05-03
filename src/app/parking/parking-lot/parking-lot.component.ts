import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { ParkingLot, ParkingLotStatus } from '../Parking';

@Component({
  selector: '[app-parking-lot]',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkingLotComponent {
  private readonly _parkingLot$ = new BehaviorSubject<ParkingLot>(null);
  private readonly _isSelected$ = new BehaviorSubject(false);

  get lot() {
    return this._parkingLot$.value;
  }

  @Input() set lot(value: ParkingLot) {
    this._parkingLot$.next(value);
  }
  @Input() set isSelected(v: boolean) {
    this._isSelected$.next(v);
  }
  @Output() select = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  readonly style$ = combineLatest([
    this._parkingLot$,
    this.authService.currentUser$,
    this._isSelected$,
  ]).pipe(
    map(([parkingLot, user, isSelected]) => {
      const color = this.getParkingLotFillColor(parkingLot, user.uid);
      return {
        fill: color,
        stroke: isSelected ? '#008ace' : color,
        'stroke-width': '5',
        opacity: '0.8',
      };
    }),
    map((styles) =>
      Object.keys(styles)
        .map((key) => `${key}:${styles[key]}`)
        .join(';')
    )
  );

  @HostListener('click')
  onParkingLotClick() {
    this.select.emit();
  }

  private getParkingLotFillColor(lot: ParkingLot, currUserId: string) {
    if (lot.status === ParkingLotStatus.Unavailable) {
      return '#d9dae1';
    }
    if (lot.userId === currUserId) {
      return '#d2eaad';
    }
    if (lot.userId) {
      return '#ff9999';
    }
    return '#b8def0';
  }
}
