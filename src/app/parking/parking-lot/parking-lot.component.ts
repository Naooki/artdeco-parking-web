import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { ParkingLot } from '../Parking';

@Component({
  selector: '[app-parking-lot]',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkingLotComponent {
  @Input() lot: ParkingLot;
  @Input() isSelected = false;
  @Output() select = new EventEmitter<void>();

  get style() {
    const styles = {
      fill: '#b8def0',
      stroke: this.isSelected ? '#008ace' : '#b8def0',
      'stroke-width': '5',
      opacity: '0.8',
    };
    return Object.keys(styles)
      .map((key) => `${key}:${styles[key]}`)
      .join(';');
  }

  @HostListener('click')
  onParkingLotClick() {
    this.select.emit();
  }
}
