
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room ,RoomDetails} from './rooms';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from "../header/header.component";
import { After } from 'v8';

@Component({
  selector: 'hinv-rooms',
  standalone: true, 
  imports: [CommonModule, RoomsListComponent, HeaderComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit,DoCheck,AfterViewInit,AfterViewChecked {
  
  hotelName = 'Hotel California';
  Titel = 'Room List';
  numberOfRooms = 100;
  hiderooms = false;
  @ViewChild(HeaderComponent /*,{static:true}  default is false*/) headerComponent!: HeaderComponent;
  //static:false we cannot change it
  @ViewChildren(HeaderComponent) hearderChildrenComponet!:QueryList<HeaderComponent>;
  rooms: Room =
  {   
    availablerooms: 7, 
    bookedrooms: 90, 
    totalrooms: 100 
  };

  roomList: RoomDetails[]=[] ;
  selectedRoom!: RoomDetails;

  toggle() {
    this.hiderooms = !this.hiderooms;
    this.Titel='Rooms List';
  }
  constructor() { }
  
  ngDoCheck(): void {
    console.log('on changes is called');
  }
  ngOnInit(): void {
    //console.log(this.headerComponent);
    this.roomList=[
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
  
  }

  ngAfterViewInit(): void {
    this.headerComponent.title ='Weccome to Hotel California';
    console.log(this.hearderChildrenComponet.last.title="Last Title");
  }
  ngAfterViewChecked(): void {
  }
  selectRoom(room: RoomDetails) {
    //console.log(room);
    this.selectedRoom = room;
  }
  AddRoom() {
    const room: RoomDetails = {
      roomnumber: 104,
      roomtype: 'Luxury Room',
      amenities: 'AC, TV, WiFi, Mini Bar, Jacuzzi',
      price: 12000,
      photo: 'assets/images/luxuryroom.jpg',
      checkinTime: new Date('15-dec-2023 14:00:00'),
      checkoutTime: new Date('16-dec-2023 12:00:00'),
      rating: 4.9
    };
    //this.roomList.push(room);
    this.roomList = [...this.roomList, room]; // Using spread operator to create a new array
  }
  
}
