import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {GetFlightsService} from "../service/get-flights.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GetDeparturingFlightsResolver implements Resolve<any> {

  constructor(private _getFlightService: GetFlightsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const date = new Date(Date.now());

    return this._getFlightService.getDepatureFlights(date.getMonth() + 1, date.getDate(), date.getHours());
  }
}
