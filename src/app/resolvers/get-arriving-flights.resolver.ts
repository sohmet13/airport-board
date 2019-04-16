import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GetFlightsService} from '../service/get-flights.service';
import {filter, map, pluck} from 'rxjs/operators';
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
        pluck('flightStatuses'),
        filter(flightStatus => Array.isArray(flightStatus)),
        map((flightStatus: any[]) => flightStatus.map(this._parseFlightData.bind(this)))
      );
  }

  private _parseFlightData(flightData): FlightData {
    const arrivalGate = flightData.airportResources.arrivalGate;

    return {
      flightId: flightData.flightId,
      arrivalOrDepartureTime: flightData.arrivalDate.dateLocal,
      arrivalOrDeparturePlace: flightData.departureAirportFsCode,
      flightNumber: `${flightData.carrierFsCode} ${flightData.flightNumber}`,
      arrivalOrDepartureGate: `${flightData.airportResources.arrivalTerminal} ${arrivalGate == null ? '' : arrivalGate}`,
      status: FlightStatuses[flightData.status]
    };
  }
}
