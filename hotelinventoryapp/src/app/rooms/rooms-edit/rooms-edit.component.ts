import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../services/rooms.service';
import { Router } from '@angular/router';
import { RoomDetails } from '../rooms';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'hinv-rooms-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms-edit.component.html',
  styleUrl: './rooms-edit.component.scss'
})
export class RoomsEditComponent implements OnInit {
  Room: RoomDetails = {
    roomnumber: 0,
    roomtype: '',
    amenities: '',
    price: 0,
    checkinTime: '',
    checkoutTime: '',
    rating: 0
  };
  dateError!: boolean;
  constructor(private service: RoomsService, private router: Router) { }

  ngOnInit(): void {

    const passedRoom = history.state.room;

    if (passedRoom) {
      this.Room = {
        ...passedRoom,
        checkinTime: new Date(passedRoom.checkinTime).toISOString().slice(0, 10),  // 'YYYY-MM-DD'
        checkoutTime: new Date(passedRoom.checkoutTime).toISOString().slice(0, 10)
      };
    }
  }

  validateDates() {
    const checkin = new Date(this.Room.checkinTime);
    const checkout = new Date(this.Room.checkoutTime);

    // Only validate if both dates are selected
    if (this.Room.checkinTime && this.Room.checkoutTime) {
      this.dateError = checkin >= checkout;
    } else {
      this.dateError = false;
    }
  }



  SuccessMessage!: string;
  EditRoom(roomsForm: NgForm) {
    this.service.editRoom(this.Room).pipe(
      tap(() => {
        this.SuccessMessage = 'Room Edited Successfully';
        this.service.triggerRefresh(); // notify list to reload
      }),
      switchMap(() => this.router.navigateByUrl('/ds/rooms'))
    ).subscribe();
  }

}


