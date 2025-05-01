
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room ,RoomDetails} from './rooms';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from "../header/header.component";
import { After } from 'v8';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'hinv-rooms',
  standalone: true, 
  imports: [CommonModule,RoomsListComponent,HeaderComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit,DoCheck,AfterViewInit,AfterViewChecked{
  
  hotelName = 'Hotel California';
  Titel = 'Sending Titel from rooms';
  numberOfRooms = 100;
  hiderooms = false;
  roomList: RoomDetails[]=[] ;
  selectedRoom!: RoomDetails;

  @ViewChild(HeaderComponent /*,{static:true}  default is false*/) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) hearderChildrenComponet!:QueryList<HeaderComponent>; //static:false default. we cannot change it

  rooms: Room ={   
    availablerooms: 7, 
    bookedrooms: 90, 
    totalrooms: 100 
  };
  constructor(private services:RoomsService) {}
  ngOnInit(): void {
    //console.log(this.headerComponent); when static is true in viewchild
    //console.log("parent ngOnit");
    this.roomList= this.services.getRoomList();
  
  }
  ngDoCheck(): void {
    console.log('ngDocheck is called from rooms for change detection');
  }

  ngAfterViewInit(): void {
    //it will call only onetime like ngOninit and contructor
    this.headerComponent.title = 'frist change titel of header';
    this.hearderChildrenComponet.last.title = ' frist change titel of header for multiple selector access';
    console.log(this.headerComponent.title+"call from ngAfterViewInit");
  }
  ngAfterViewChecked(): void {
    console.log(this.headerComponent.title+"call from ngAfterViewChecked");
  }
  
  toggle() {
    this.hiderooms = !this.hiderooms;
    this.Titel='Sending Titel from rooms after changes';
    this.headerComponent.title = 'multiple change of titel in header';
    this.hearderChildrenComponet.last.title = 'multiple change titel of header for multiple selector access';
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
    this.roomList = [...this.roomList, room]; // Using spread operator to make the list dynamic
  }
  
}
