import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {catchError} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {GetFlightsService} from '../service/get-flights.service';
import {FlightData, FlightStatuses} from '../commons';


@Injectable({
  providedIn: 'root',
})
export class GetArrivingFlightsResolver implements Resolve<any> {

  constructor(private _getFlightService: GetFlightsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const date = new Date(Date.now());

    return this._getFlightService
      .getArrivalFlights(date.getMonth() + 1, date.getDate(), date.getHours())
      .pipe(
        map((flightStatus: any[]) => flightStatus.map(this._parseFlightData.bind(this))),
        catchError(error => of(error))
      );
  }

  private _parseFlightData(flightData): FlightData {
    const arrivalGate = flightData.airportResources.arrivalGate;

    return {
      flightId: flightData.flightId,
      arrivalOrDepartureTime: flightData.arrivalDate.dateLocal,
      arrivalOrDeparturePlace: this._getFlightService.airportCodes[flightData.departureAirportFsCode],
      airlineCode: flightData.carrierFsCode,
      flightNumber: flightData.flightNumber,
      arrivalOrDepartureGate: `${flightData.airportResources.arrivalTerminal} ${arrivalGate == null ? '' : arrivalGate}`,
      status: FlightStatuses[flightData.status]
    };
  }
}
