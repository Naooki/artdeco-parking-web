import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ParkingLot } from '../Parking';

@Component({
  selector: 'app-parking-lot-desc',
  templateUrl: './parking-lot-desc.component.html',
  styleUrls: ['./parking-lot-desc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkingLotDescComponent {
  @Input() parkingLot: ParkingLot;
}
