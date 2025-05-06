
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room ,RoomDetails} from './rooms';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from "../header/header.component";
import { RoomsService } from './services/rooms.service';
import { HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'hinv-rooms', 
  imports: [CommonModule,RoomsListComponent,HeaderComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit,DoCheck,AfterViewInit,AfterViewChecked{
  
  hotelName = 'Hotel California';
  Titel = 'Sending Titel from rooms';
  numberOfRooms = 100;
  hiderooms = true;
  roomList: RoomDetails[]=[] ;
  selectedRoom!: RoomDetails;

  @ViewChild(HeaderComponent /*,{static:true}  default is false*/) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) hearderChildrenComponet!:QueryList<HeaderComponent>; //static:false default. we cannot change it

  rooms: Room ={   
    availablerooms: 7, 
    bookedrooms: 90, 
    totalrooms: 100 
  };
  
  //this is dependency injection
  constructor(@SkipSelf() private services:RoomsService) {
      //As we add @skipSelf,we do not have to have provider in this component,but have to have in parent and appModule
  }
  //we will pass data from parent to child using async pipe

  room$!: Observable<RoomDetails[]>; //wiil use async pipe

  Totalbyte=0;
  ngOnInit(): void {
    //console.log(this.headerComponent); when static is true in viewchild
    //console.log("parent ngOnit");
    this.room$ = this.services.getRoom$; // Initialize here
   
     this.services.getRoom$.subscribe((data: RoomDetails[])=>{
     this.roomList=data;//it is more faster than without Rjsx shareReplay getRoomList method
    });
    //resi api request
    this.services.getPhotos().subscribe((event:any)=>{
      switch(event.type){
        case HttpEventType.Sent:{
          console.log("Request has been Made!");
          break;
        }
        case HttpEventType.ResponseHeader:{
          console.log("Request success");
          break;
        }
        case HttpEventType.DownloadProgress:{
           this.Totalbyte+=event.loaded;
           break;
        }
        case HttpEventType.Response:{
          console.log(event.body);
          break;
        }
     }

    });
       
   
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
      roomnumber: 120,
      roomtype: 'Luxury Room',
      amenities: 'AC, TV, WiFi, Mini Bar, Jacuzzi',
      price: 12000,
      checkinTime: new Date('15-dec-2023 14:00:00'),
      checkoutTime: new Date('16-dec-2023 12:00:00'),
      rating: 4.9
    };
    //this.roomList.push(room);
    // this.roomList = [...this.roomList, room]; Using spread operator to make the list dynamic
    this.services.addRoom(room).subscribe((data) => {
      this.roomList = [...this.roomList, room];
    });
  }

  EditRoom(){
    const room: RoomDetails = {
      roomnumber: 120,
      roomtype: 'Luxury Room Edited',
      amenities: 'AC, TV, WiFi, Mini Bar, Jacuzzi',
      price: 12000,
      checkinTime: new Date('15-dec-2023 14:00:00'),
      checkoutTime: new Date('16-dec-2023 12:00:00'),
      rating: 4.9
    };

    this.services.editRoom(room).subscribe((data) => {
      this.roomList = this.roomList.map(r => 
        r.roomnumber === room.roomnumber ? room : r
      );
    });
    
  }

  ReceiveDeletedID(ID:any)
  {
    this.services.deleteRoom(ID).subscribe(() => {
      this.roomList = this.roomList.filter(room => room.roomnumber !== ID);
    });
    
  }
  
}