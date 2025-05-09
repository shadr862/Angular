import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hinv-rooms-booking',
  imports: [CommonModule],
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.scss'
})
export class RoomsBookingComponent implements OnInit {
  ID: any;
  ID$!:Observable<number>;
  constructor(private router: ActivatedRoute) {

  }
  ngOnInit(): void {
     // it doesnot consume memory but it will not work in parent and child situation
    this.ID=this.router.snapshot.params['roomid'];
    /*
    for single value catch
    this.ID$=this.router.params.pipe(
      map(data=>data['roomid'])
    )
    */
    //for multiple information and most useful
    this.ID$=this.router.paramMap.pipe(
      map(data => {
        const roomId = data.get('roomid');
        return roomId ? +roomId : 0; // Convert to number and handle null
      })
    )
    /*
    subscribe consume memory
    this.router.params.subscribe(data=>{
    this.ID=data['roomid'];
    console.log(data);
    })
    */
  }

}
