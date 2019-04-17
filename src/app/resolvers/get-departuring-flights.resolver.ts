import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {catchError} from 'rxjs/internal/operators';

import {GetFlightsService} from '../service/get-flights.service';
import {FlightData, FlightStatuses} from '../commons';

@Injectable({
  providedIn: 'root',
})
export class GetDeparturingFlightsResolver implements Resolve<any> {

  constructor(private _getFlightService: GetFlightsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const date = new Date(Date.now());

    return this._getFlightService
      .getDepatureFlights(date.getMonth() + 1, date.getDate(), date.getHours())
      .pipe(
        map((flightStatus: any) => flightStatus.map(this._parseFlightData.bind(this))),
        catchError(error => of(error))
      );
  }

  private _parseFlightData(flightData): FlightData {
    const departureGate = flightData.airportResources.departureGate;

    return {
      flightId: flightData.flightId,
      arrivalOrDepartureTime: flightData.departureDate.dateLocal,
      arrivalOrDeparturePlace: this._getFlightService.airportCodes[flightData.arrivalAirportFsCode],
      airlineCode: flightData.carrierFsCode,
      flightNumber: flightData.flightNumber,
      arrivalOrDepartureGate: `${flightData.airportResources.departureTerminal} ${departureGate == null ? '' : departureGate}`,
      status: FlightStatuses[flightData.status]
    };
  }
}
