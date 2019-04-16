import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GetFlightsService} from '../service/get-flights.service';

@Injectable({
  providedIn: 'root',
})
export class GetArrivingFlightsResolver implements Resolve<any> {

  constructor(private _getFlightService: GetFlightsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const date = new Date(Date.now());

    return this._getFlightService.getArrivalFlights(date.getMonth() + 1, date.getDate(), date.getHours());
  }
}
