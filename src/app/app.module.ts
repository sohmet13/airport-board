import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router'
import {ScrollingModule} from '@angular/cdk/scrolling';

import {routes} from './app.routes';
import {AppComponent} from './app.component';
import {FlightsSheduleComponent} from './flights-shedule/flights-shedule.component';
import {GetFlightsService} from './service/get-flights.service';
import {GetArrivingFlightsResolver} from './resolvers/get-arriving-flights.resolver';
import {GetDeparturingFlightsResolver} from './resolvers/get-departuring-flights.resolver';
import {FilterPipe} from './commons';

@NgModule({
  declarations: [
    AppComponent,
    FlightsSheduleComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    GetFlightsService,
    GetArrivingFlightsResolver,
    GetDeparturingFlightsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
