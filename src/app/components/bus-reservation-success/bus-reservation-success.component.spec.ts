import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusReservationSuccessComponent } from './bus-reservation-success.component';

describe('BusReservationSuccessComponent', () => {
  let component: BusReservationSuccessComponent;
  let fixture: ComponentFixture<BusReservationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusReservationSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusReservationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
