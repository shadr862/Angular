import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room ,RoomDetails} from './rooms';   

@Component({
  selector: 'hinv-rooms',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  hotelName = 'Hotel California';
  numberOfRooms = 100;
  hiderooms = false;

  rooms: Room =
  {   
    availablerooms: 7, 
    bookedrooms: 90, 
    totalrooms: 100 
  };

  roomList: RoomDetails[] = [
    {
      roomnumber: 101,
      roomtype: 'Deluxe Room',
      amenities: 'AC, TV, WiFi',
      price: 5000,
      photo: 'assets/images/deluxeroom.jpg',
      checkinTime: new Date('12-oct-2023 14:00:00'),
      checkoutTime: new Date('13-oct-2023 12:00:00')
    },
    {
      roomnumber: 102,
      roomtype: 'Super Deluxe Room',
      amenities: 'AC, TV, WiFi, Mini Bar',
      price: 7000,
      photo: 'assets/images/superdeluxeroom.jpg',
      checkinTime: new Date('11-nov-2023 14:00:00'),
      checkoutTime: new Date('12-nov-2023 12:00:00')
    }
    ,
    {
      roomnumber: 103,
      roomtype: 'Suite Room',
      amenities: 'AC, TV, WiFi, Mini Bar, Living Room',
      price: 10000,
      photo: 'assets/images/suiteroom.jpg',
      checkinTime: new Date('10-dec-2023 14:00:00'),
      checkoutTime: new Date('11-dec-2023 12:00:00')
    }
  ];
  

  toggle() {
    this.hiderooms = !this.hiderooms;
  }
  
  
}
