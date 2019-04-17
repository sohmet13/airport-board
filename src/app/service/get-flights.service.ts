import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class GetFlightsService {

  private readonly isHttps = /https:\/\//.test(window.location.href);

  private readonly appId = '13589e42';
  private readonly appKey = 'f0ec2cb5911df89c88213eb20e046597';
  // Шереметьево
  private readonly _baseUrl = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/SVO';
  private readonly _urls = {
    arrivalFlights: (month: number, day: number, hourOfDay: number) => `${this._baseUrl}/arr/2019/${month}/${day}/${hourOfDay}`,
    departureFlights: (month: number, day: number, hourOfDay: number) => `${this._baseUrl}/dep/2019/${month}/${day}/${hourOfDay}`
  };

  airportCodes: { [key: string]: string };
  requestTime: any = {};

  constructor(private _http: HttpClient) {
  }

  getArrivalFlights(month: number, day: number, hourOfDay: number): Observable<any> {
    return this._http
      .get(
        !this.isHttps ? 'src/assets/json/arrival.json' : this._urls.arrivalFlights(month, day, hourOfDay),
        this.isHttps ? {params: {appId: this.appId, appKey: this.appKey}} : {})
      .pipe(map(this._setAirportCodes.bind(this)));
  }

  getDepatureFlights(month: number, day: number, hourOfDay: number): Observable<any> {
    return this._http
      .get(
        !this.isHttps ? 'src/assets/json/departure.json' : this._urls.departureFlights(month, day, hourOfDay),
        this.isHttps ? {params: {appId: this.appId, appKey: this.appKey}} : {})
      .pipe(map(this._setAirportCodes.bind(this)));
  }

  private _setAirportCodes(flightData: any): any {
    this.airportCodes = flightData.appendix.airports.reduce((acc, val) => {
      acc[val.fs] = val.city;
      return acc;
    }, {});

    this.requestTime = {
      day: flightData.request.date.day,
      month: flightData.request.date.month,
      hour: flightData.request.hourOfDay.requested
    };

    return flightData.flightStatuses;
  }
}
