import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusRouteListComponent } from './components/bus-route-list/bus-route-list.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { BusSeatsComponent } from './components/bus-seats/bus-seats.component';
import { BusReservationSuccessComponent } from './components/bus-reservation-success/bus-reservation-success.component';

const routes: Routes = [
  {path:'' , redirectTo:'bus', pathMatch:'full'},
  {path:'bus' , component: BusListComponent},
  {path:'bus-route/:bid' , component: BusRouteListComponent},
  {path:'bus-seat/:brid' , component: BusSeatsComponent},
  {path:'reservation/:resId' , component: BusReservationSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
