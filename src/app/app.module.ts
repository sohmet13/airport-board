import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlightsSheduleComponent } from './flights-shedule/flights-shedule.component';
import {GetFlightsService} from './service/get-flights.service';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {GetArrivingFlightsResolver} from './resolvers/get-arriving-flights.resolver';
import {HttpClientModule} from '@angular/common/http';
import {GetDeparturingFlightsResolver} from "./resolvers/get-departuring-flights.resolver";

@NgModule({
  declarations: [
    AppComponent,
    FlightsSheduleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GetFlightsService, GetArrivingFlightsResolver, GetDeparturingFlightsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
