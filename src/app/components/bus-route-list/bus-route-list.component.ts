import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusRoutes } from 'src/app/models/bus-routes.model';
import { Bus } from 'src/app/models/bus.model';
import { Cities } from 'src/app/models/cities.model';
import { BusService } from 'src/app/services/bus.service';
import { CitiesService } from 'src/app/services/cities.service';
import { BusRoutesService } from '../../services/bus-routes.service';

@Component({
  selector: 'app-bus-route-list',
  templateUrl: './bus-route-list.component.html',
  styleUrls: ['./bus-route-list.component.css']
})
export class BusRouteListComponent implements OnInit {
  allCities: Cities[] = [];
  allBusRoutes: BusRoutes[] = [];
  viewBus: Bus = {
    id: 0,
    busName: '',
    busTicketFare: 0,
    busFromId: 0,
    busToId: 0,
    busTotalSeats: 0,
    busImageUrl: [] 
}
  
  constructor(private activatedRoute: ActivatedRoute, 
              private busRoutesService: BusRoutesService,
              private busService: BusService,
              private router: Router,
              private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.citiesService.fetchAllCities().subscribe((response)=> this.allCities = response)

    let busId = this.activatedRoute.snapshot.paramMap.get("bid");

    if(busId!=null){
      this.busRoutesService.fetchBusRoutesByBusId(+busId).subscribe({
        next: (response)=>{
          this.allBusRoutes = response;
          if(busId!=null){
            this.busService.fetchABus(+busId).subscribe({
              next:(response)=>this.viewBus=response,
              error: (err)=>console.log(err)
            })
          }
        },
        error: (err)=>console.log(err)
      })
    }
  }

  viewSeats(busRouteId: number){
    this.router.navigate(['bus-seat', busRouteId]);
  }
}
