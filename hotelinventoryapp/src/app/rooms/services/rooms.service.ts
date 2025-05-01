import { Injectable } from '@angular/core';
import { RoomDetails } from '../rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomList:RoomDetails[]=[
    {
      roomnumber: 101,
      roomtype: 'Deluxe Room',
      amenities: 'AC, TV, WiFi',
      price: 5000,
      photo: 'assets/images/deluxeroom.jpg',
      checkinTime: new Date('12-oct-2023 14:00:00'),
      checkoutTime: new Date('13-oct-2023 12:00:00'),
      rating: 4.5
    },
    {
      roomnumber: 102,
      roomtype: 'Super Deluxe Room',
      amenities: 'AC, TV, WiFi, Mini Bar',
      price: 7000,
      photo: 'assets/images/superdeluxeroom.jpg',
      checkinTime: new Date('11-nov-2023 14:00:00'),
      checkoutTime: new Date('12-nov-2023 12:00:00'),
      rating: 4.8
    }
    ,
    {
      roomnumber: 103,
      roomtype: 'Suite Room',
      amenities: 'AC, TV, WiFi, Mini Bar, Living Room',
      price: 10000,
      photo: 'assets/images/suiteroom.jpg',
      checkinTime: new Date('10-dec-2023 14:00:00'),
      checkoutTime: new Date('11-dec-2023 12:00:00'),
      rating: 4.92334
    },
    {
      roomnumber: 104,
      roomtype: 'Luxury Room',
      amenities: 'AC, TV, WiFi, Mini Bar, Jacuzzi',
      price: 12000,
      photo: 'assets/images/luxuryroom.jpg',
      checkinTime: new Date('15-dec-2023 14:00:00'),
      checkoutTime: new Date('16-dec-2023 12:00:00'),
      rating: 4.9
    }

  ];

  constructor() { 
    console.log('Room Service is created');
  }
  getRoomList(): RoomDetails[] {
    return this.roomList;
  }
}
