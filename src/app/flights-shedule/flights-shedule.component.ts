import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter, map, pluck} from "rxjs/internal/operators";
import {FlightData} from "../commons";
import {FlightStatuses} from "../commons/flight-statuses.enum";

@Component({
  selector: 'app-flights-shedule',
  templateUrl: './flights-shedule.component.html',
  styleUrls: ['./flights-shedule.component.scss']
})
export class FlightsSheduleComponent implements OnInit {

  readonly date = new Date(Date.now()).getDate();
  readonly hour = new Date(Date.now()).getHours();

  flightData: FlightData[];

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    // TODO отписаться
    this._route.data.pipe(
      pluck('flights'),
      pluck('flightStatuses'),
      filter(flightStatus => Array.isArray(flightStatus)),
      map((flightStatus: any[]) => {console.log(flightStatus); return flightStatus.map(this._parseFlightData.bind(this))})
    ).subscribe((flightData: FlightData[]) => this.flightData = flightData);
  }

  private _parseFlightData(flightData): FlightData {
    const hour = new Date(flightData.arrivalDate.dateLocal).getHours();
    const minute = new Date(flightData.arrivalDate.dateLocal).getMinutes();

    const arrivalGate = flightData.airportResources.arrivalGate;
    // TODO проверить arrivalOrDepartureGate на депарртьюрес
    return {
      flightId: flightData.flightId,
      arrivalOrDepartureTime: `${this._setTimeString(hour)}:${this._setTimeString(minute)}`,
      arrivalOrDeparturePlace: flightData.departureAirportFsCode,
      flightNumber: `${flightData.carrierFsCode} ${flightData.flightNumber}`,
      arrivalOrDepartureGate: `${flightData.airportResources.arrivalTerminal} ${arrivalGate == null ? '' : arrivalGate}`,
      status: FlightStatuses[flightData.status]
    };
  }

  private _setTimeString(num: number): string | number {
    return num > 9 ? num : '0' + num;
  }

}
