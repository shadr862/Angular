import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RoomDetails } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { CommonModule } from '@angular/common';

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
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0
  };
  constructor(private service: RoomsService) { }
  SuccessMessage!: string;
  AddRoom(roomsForm: NgForm) {
    this.service.addRoom(this.Room).subscribe(data => {
      this.SuccessMessage = "Room Added Successfully";
      roomsForm.resetForm({
        roomnumber: 0,
        roomtype: '',
        amenities: '',
        price: 0,
        checkinTime: new Date(),
        checkoutTime: new Date(),
        rating: 0
      });
    })
  }
}
