import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus.model';
import { Cities } from 'src/app/models/cities.model';
import { BusService } from 'src/app/services/bus.service';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {

  allBus: Bus[] = [];
  allCities: Cities[] = [];
  
  constructor(private busService: BusService, private router:Router, private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.citiesService.fetchAllCities().subscribe((response)=> this.allCities = response)
    this.busService.fetchAllBus().subscribe({
      next: (response)=>this.allBus=response,
      error: (err)=>console.log(err)
    })
  }

  viewRoutes(busId: number){
    this.router.navigate(['bus-route', busId]);
  }

}
