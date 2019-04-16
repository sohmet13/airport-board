import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {pluck} from 'rxjs/internal/operators';
import {Subscription} from 'rxjs';
import {FlightData, FlightStatuses} from '../commons';

@Component({
  selector: 'app-flights-shedule',
  templateUrl: './flights-shedule.component.html',
  styleUrls: ['./flights-shedule.component.scss']
})
export class FlightsSheduleComponent implements OnInit, OnDestroy {

  periodTime: string;
  flightData: FlightData[];

  showDelayed = false;
  buttonText = 'Показать задержанные';
  filterValue;

  routerDataSubscription: Subscription;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.routerDataSubscription = this._route.data
      .pipe(pluck('flights'))
      .subscribe(this._setDataForView.bind(this));
  }

  toggleDelayed(): void {
    this.showDelayed = !this.showDelayed;
    this.buttonText = this.showDelayed ? 'Показать все' : 'Показать задержанные';
    this.filterValue = this.showDelayed ? FlightStatuses.D : null;
  }

  private _setDataForView(flightData: FlightData[]): void {
    this.flightData = flightData;
    this.periodTime = flightData[0].arrivalOrDepartureTime;
  }

  ngOnDestroy() {
    this.routerDataSubscription.unsubscribe();
  }

}
