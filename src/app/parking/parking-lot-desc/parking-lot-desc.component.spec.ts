import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotDescComponent } from './parking-lot-desc.component';

describe('ParkingLotDescComponent', () => {
  let component: ParkingLotDescComponent;
  let fixture: ComponentFixture<ParkingLotDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLotDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingLotDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
