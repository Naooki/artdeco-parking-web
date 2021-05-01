import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parking-view',
  templateUrl: './parking-view.component.svg',
  styleUrls: ['./parking-view.component.scss']
})
export class ParkingViewComponent implements OnInit {

  readonly parkingConfig = {
    width: 600,
    height: 2000,
    lots: [
      // left-row
      { x: 5, y: 50, width: 200, height: 90 },
      { x: 5, y: 150, width: 200, height: 90 },
      { x: 5, y: 250, width: 200, height: 90 },
      { x: 5, y: 350, width: 200, height: 90 },
      { x: 5, y: 450, width: 200, height: 90 },
      { x: 5, y: 550, width: 200, height: 90 },
      { x: 5, y: 650, width: 200, height: 90 },
      { x: 5, y: 750, width: 200, height: 90 },
      { x: 5, y: 850, width: 200, height: 90 },
      { x: 5, y: 950, width: 200, height: 90 },
      { x: 5, y: 1050, width: 200, height: 90 },
      { x: 5, y: 1150, width: 200, height: 90 },
      { x: 5, y: 1250, width: 200, height: 90 },
      { x: 5, y: 1350, width: 200, height: 90 },
      { x: 5, y: 1450, width: 200, height: 90 },
      { x: 5, y: 1550, width: 200, height: 90 },
      { x: 5, y: 1650, width: 200, height: 90 },
      { x: 5, y: 1750, width: 200, height: 90 },
      { x: 5, y: 1850, width: 200, height: 90 },
      // right-row
      { x: 395, y: 50, width: 200, height: 90 },
      { x: 395, y: 150, width: 200, height: 90 },
      { x: 395, y: 250, width: 200, height: 90 },
      { x: 395, y: 350, width: 200, height: 90 },
      { x: 395, y: 450, width: 200, height: 90 },
      { x: 395, y: 550, width: 200, height: 90 },
      { x: 395, y: 650, width: 200, height: 90 },
      { x: 395, y: 750, width: 200, height: 90 },
      { x: 395, y: 850, width: 200, height: 90 },
      { x: 395, y: 950, width: 200, height: 90 },
      { x: 395, y: 1050, width: 200, height: 90 },
      { x: 395, y: 1150, width: 200, height: 90 },
      { x: 395, y: 1250, width: 200, height: 90 },
      { x: 395, y: 1350, width: 200, height: 90 },
      { x: 395, y: 1450, width: 200, height: 90 },
      { x: 395, y: 1550, width: 200, height: 90 },
      { x: 395, y: 1650, width: 200, height: 90 },
      { x: 395, y: 1750, width: 200, height: 90 },
      { x: 395, y: 1850, width: 200, height: 90 },
    ],
  }

  selectedLot = null;

  constructor() { }

  ngOnInit(): void {
  }
}
