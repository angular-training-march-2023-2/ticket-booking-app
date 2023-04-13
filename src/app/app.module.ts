import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { BusRouteListComponent } from './components/bus-route-list/bus-route-list.component';
import { BusSeatsComponent } from './components/bus-seats/bus-seats.component';
import { BusReservationSuccessComponent } from './components/bus-reservation-success/bus-reservation-success.component';

@NgModule({
  declarations: [
    AppComponent,
    BusListComponent,
    BusRouteListComponent,
    BusSeatsComponent,
    BusReservationSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
