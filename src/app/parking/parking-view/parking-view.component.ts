import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Parking, ParkingLot } from '../Parking';

@Component({
  selector: 'app-parking-view',
  templateUrl: './parking-view.component.svg',
  styleUrls: ['./parking-view.component.scss'],
})
export class ParkingViewComponent {
  @Input() parkingConfig: Parking;
  @Input() parkingLots: ParkingLot[];

  @Input() selectedParkingLot: ParkingLot;
  @Output() selectedParkingLotChange = new EventEmitter<ParkingLot>();

  onParkingLotSelected(parkingLot: ParkingLot) {
    this.selectedParkingLotChange.emit(parkingLot);
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
