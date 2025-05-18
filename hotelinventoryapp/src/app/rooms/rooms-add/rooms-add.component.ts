import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RoomDetails } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'hinv-rooms-add',
  imports: [FormsModule, CommonModule],
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss'
})
export class RoomsAddComponent {


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
  constructor(private service: RoomsService, private router: Router, private route: ActivatedRoute) { }

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
  AddRoom(roomsForm: NgForm) {
    this.service.addRoom(this.Room).pipe(
       tap(()=>{
        this.SuccessMessage = "Room Added Successfully";
        this.service.triggerRefresh();// notify list to reload
       }),
       switchMap(() => this.router.navigateByUrl('/ds/rooms'))
    ).subscribe(data => {
      
      roomsForm.resetForm({
        roomnumber: 0,
        roomtype: '',
        amenities: '',
        price: 0,
        checkinTime: '',
        checkoutTime: '',
        rating: 0
      });
    })
   
  }

  close()
  {
    return this.router.navigate(['/ds/rooms']);
  }
}
