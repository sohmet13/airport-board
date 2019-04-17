import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsSheduleComponent } from './flights-shedule.component';

describe('FlightsSheduleComponent', () => {
  let component: FlightsSheduleComponent;
  let fixture: ComponentFixture<FlightsSheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsSheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsSheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
