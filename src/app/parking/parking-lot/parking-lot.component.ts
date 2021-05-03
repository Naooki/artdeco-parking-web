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
  private readonly _isSelected$ = new BehaviorSubject(false);

  @Input() lot: ParkingLot;
  @Input() set isSelected(v: boolean) {
    this._isSelected$.next(v);
  }
  @Output() select = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  readonly style$ = combineLatest([
    this.authService.currentUser$,
    this._isSelected$,
  ]).pipe(
    map(([user, isSelected]) => {
      const color = this.getParkingLotFillColor(user.uid);
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

  private getParkingLotFillColor(currUserId: string) {
    if (this.lot.status === ParkingLotStatus.Unavailable) {
      return '#d9dae1';
    }
    if (this.lot.userId === currUserId) {
      return '#d2eaad';
    }
    if (this.lot.userId) {
      return '#ff9999';
    }
    return '#b8def0';
  }
}
