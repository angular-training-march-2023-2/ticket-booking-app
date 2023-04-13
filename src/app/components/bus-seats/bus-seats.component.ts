import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusRoutes } from 'src/app/models/bus-routes.model';
import { Bus } from 'src/app/models/bus.model';
import { Reservations } from 'src/app/models/reservations.model';
import { BusRoutesService } from 'src/app/services/bus-routes.service';
import { BusService } from 'src/app/services/bus.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-bus-seats',
  templateUrl: './bus-seats.component.html',
  styleUrls: ['./bus-seats.component.css']
})
export class BusSeatsComponent implements OnInit {

  color: string = '';
  selectedSeats: number[] =[];
  totalSeats: number[] = [];

  busRoute: BusRoutes = {
    id: 0,
    busId: 0,
    busTravelDateTime: new Date(),
    busSeatsTaken: []
  }

  viewBus: Bus = {
    id: 0,
    busName: '',
    busTicketFare: 0,
    busFromId: 0,
    busToId: 0,
    busTotalSeats: 0,
    busImageUrl: [] 
}
  constructor(private activateRoute: ActivatedRoute, 
              private busRoutesService: BusRoutesService,
              private busService: BusService,
              private reservationService: ReservationsService,
              private router: Router) { }

  ngOnInit(): void {
    let busRouteId = this.activateRoute.snapshot.paramMap.get("brid");

    if(busRouteId!=null){
      this.busRoutesService.fetchABusRoute(+busRouteId).subscribe({
        next: (response)=>{
          this.busRoute=response;
          this.busService.fetchABus(this.busRoute.busId).subscribe({
            next: (response)=>{
              this.viewBus = response
              for(let i=1;i<=this.viewBus.busTotalSeats;i++){
                this.totalSeats.push(i);
              }
            },
            error: (err)=>console.log(err)
          })
        }
      })
    }

  }


  addToSelectedSeats(seatNo: number){

    if(this.selectedSeats.findIndex((eachSeat)=>eachSeat==seatNo)==-1){
      // means the seatNo is not selected
      this.selectedSeats.push(seatNo);
    }else{
      // means the seat is selected, so we have to deselect /remove the seat from the array
      this.selectedSeats.splice(this.selectedSeats.indexOf(seatNo),1);
    }
    
    // now work on the background color of the button
    this.seatDisplay(seatNo);
  }

  seatDisplay(seatNo: number){
    if(this.busRoute.busSeatsTaken.findIndex((eachSeat)=>eachSeat==seatNo)!=-1){
      // measn this seat is already booked
      this.color="RED";
    }else if(this.selectedSeats.findIndex((eachSeat)=>eachSeat==seatNo)!=-1){
      this.color="GREEN"
    }else{
      this.color="LIGHT";
    }
    return this.color;
  }

  reserveTickets(){
    let addDetails: Reservations = {
      id: 0,
      resBusRouteId: this.busRoute.id,
      resSeatsTaken: this.selectedSeats
    }
    this.reservationService.addReservation(addDetails).subscribe((res)=>{
      this.busRoute.busSeatsTaken = this.busRoute.busSeatsTaken.concat(this.selectedSeats);
      this.busRoutesService.updateBusRoute(this.busRoute).subscribe((response)=>{
        this.router.navigate(['reservation', res.id]);
      })
    })
  }

  totalCost(){
    return this.selectedSeats.length * this.viewBus.busTicketFare;
  }
}
