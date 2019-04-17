import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

import {filter, pluck} from 'rxjs/internal/operators';
import {Subscription} from 'rxjs';

import {FlightData, FlightStatuses} from '../commons';
import {GetFlightsService} from '../service/get-flights.service';

@Component({
  selector: 'app-flights-shedule',
  templateUrl: './flights-shedule.component.html',
  styleUrls: ['./flights-shedule.component.scss']
})
export class FlightsSheduleComponent implements OnInit, OnDestroy {

  readonly months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  search = '';

  flightData: FlightData[];

  buttonText = 'Показать задержанные';
  filterValue: FlightStatuses;

  private _showDelayed = false;
  private _routerDataSubscription: Subscription;

  constructor(private _route: ActivatedRoute,
              public getFlightService: GetFlightsService) {
  }

  ngOnInit() {
    this._routerDataSubscription = this._route.data
      .pipe(
        pluck('flights'),
        filter(data => data && !(data instanceof HttpErrorResponse))
      ).subscribe(this._setDataForView.bind(this));
  }

  toggleDelayed(): void {
    this._showDelayed = !this._showDelayed;
    this.buttonText = this._showDelayed ? 'Показать все' : 'Показать задержанные';
    this.filterValue = this._showDelayed ? FlightStatuses.D : null;
  }

  private _setDataForView(flightData: FlightData[]): void {
    this.flightData = flightData.sort((a, b) => Date.parse(a.arrivalOrDepartureTime) - Date.parse(b.arrivalOrDepartureTime));
  }

  ngOnDestroy() {
    this._routerDataSubscription.unsubscribe();
  }

}
