import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusRoutes } from 'src/app/models/bus-routes.model';
import { Bus } from 'src/app/models/bus.model';
import { Cities } from 'src/app/models/cities.model';
import { Reservations } from 'src/app/models/reservations.model';
import { BusRoutesService } from 'src/app/services/bus-routes.service';
import { BusService } from 'src/app/services/bus.service';
import { CitiesService } from 'src/app/services/cities.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-bus-reservation-success',
  templateUrl: './bus-reservation-success.component.html',
  styleUrls: ['./bus-reservation-success.component.css']
})
export class BusReservationSuccessComponent implements OnInit {
  fetchedRes: Reservations = {
    id: 0,
    resBusRouteId: 0,
    resSeatsTaken: []
  }

  fetchedBusRoute: BusRoutes = {
    id: 0,
    busId: 0,
    busTravelDateTime: new Date(),
    busSeatsTaken: []
  };
  
  fetchedBus: Bus = {
    id: 0,
    busName: '',
    busTicketFare: 0,
    busFromId: 0,
    busToId: 0,
    busTotalSeats: 0,
    busImageUrl: [] 
  }

  allCities: Cities[] = [];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private reservationService: ReservationsService,
              private busRouteService: BusRoutesService,
              private citiesService: CitiesService,
              private busService: BusService) { }

  ngOnInit(): void {
    this.citiesService.fetchAllCities().subscribe((response)=>{
      this.allCities = response;
    })

    let resId = this.activatedRoute.snapshot.paramMap.get('resId');
    if(resId!=null){
      this.reservationService.fetchAReservation(+resId).subscribe((response)=>{
        this.fetchedRes = response;
        this.busRouteService.fetchABusRoute(this.fetchedRes.resBusRouteId).subscribe((response)=>{
          this.fetchedBusRoute = response;
          this.busService.fetchABus(this.fetchedBusRoute.busId).subscribe((response)=>{
            this.fetchedBus = response;
          })
        })
      })
    }
  }

}
