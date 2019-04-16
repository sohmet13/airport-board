import {Routes} from '@angular/router';
import {FlightsSheduleComponent} from './flights-shedule/flights-shedule.component';
import {GetArrivingFlightsResolver} from './resolvers/get-arriving-flights.resolver';
import {GetDeparturingFlightsResolver} from "./resolvers/get-departuring-flights.resolver";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/arrival',
  },
  {
    path: 'arrival',
    component: FlightsSheduleComponent,
    resolve: {
      flights: GetArrivingFlightsResolver
    }
  },
  {
    path: 'departure',
    component: FlightsSheduleComponent,
    resolve: {
      flights: GetDeparturingFlightsResolver
    }}
];
