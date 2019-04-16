import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, pluck} from 'rxjs/internal/operators';
import {FlightData} from '../commons';

@Injectable({
  providedIn: 'root'
})
export class GetFlightsService {

  private readonly appId = '13589e42';
  private readonly appKey = 'f0ec2cb5911df89c88213eb20e046597';
  // Шереметьево
  private readonly _baseUrl = 'https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/SVO';
  private readonly _urls = {
    arrivalFlights: (month: number, day: number, hourOfDay: number) => `${this._baseUrl}/arr/2019/${month}/${day}/${hourOfDay}`,
    departureFlights: (month: number, day: number, hourOfDay: number) => `${this._baseUrl}/dep/2019/${month}/${day}/${hourOfDay}`
  };

  constructor(private _http: HttpClient) { }

  getArrivalFlights(month: number, day: number, hourOfDay: number): Observable<any> {
    return this._http.get('src/assets/json/arrival.json'/*this._urls.arrivalFlights(month, day, hourOfDay), {params: {appId: this.appId, appKey: this.appKey}}*/);
  }

  getDepatureFlights(month: number, day: number, hourOfDay: number): Observable<any> {
    return this._http.get('src/assets/json/departure.json' /*this._urls.departureFlights(month, day, hourOfDay), {params: {appId: this.appId, appKey: this.appKey}}*/);
  }
}
