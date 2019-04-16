import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {GetFlightsService} from "../service/get-flights.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {filter, map, pluck} from 'rxjs/operators';
import {FlightData, FlightStatuses} from '../commons';

@Injectable({
  providedIn: 'root',
})
export class GetDeparturingFlightsResolver implements Resolve<any> {

  constructor(private _getFlightService: GetFlightsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const date = new Date(Date.now());

    return this._getFlightService
      .getDepatureFlights(date.getMonth() + 1, date.getDate(), date.getHours())
      .pipe(
        pluck('flightStatuses'),
        filter(flightStatus => Array.isArray(flightStatus)),
        map((flightStatus: any[]) => flightStatus.map(this._parseFlightData.bind(this)))
      );
  }

  private _parseFlightData(flightData): FlightData {
    const departureGate = flightData.airportResources.departureGate;

    return {
      flightId: flightData.flightId,
      arrivalOrDepartureTime: flightData.departureDate.dateLocal,
      arrivalOrDeparturePlace: flightData.arrivalAirportFsCode,
      flightNumber: `${flightData.carrierFsCode} ${flightData.flightNumber}`,
      arrivalOrDepartureGate: `${flightData.airportResources.departureTerminal} ${departureGate == null ? '' : departureGate}`,
      status: FlightStatuses[flightData.status]
    };
  }
}
