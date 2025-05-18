
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room, RoomDetails } from './rooms';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from "../header/header.component";
import { RoomsService } from './services/rooms.service';
import { HttpEventType } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'hinv-rooms',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RoomsListComponent, HeaderComponent,FormsModule,RouterModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

  hotelName = 'Hotel California in America';
  Titel = 'Hotel California';
  numberOfRooms = 100;
  hiderooms = false;
  roomList: RoomDetails[] = [];
  selectedRoom!: RoomDetails;
  filterPrice = new FormControl(0);
  filterRoomtype = new FormControl('');
  priceSortOrder: any;

  @ViewChild(HeaderComponent /*,{static:true}  default is false*/) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) hearderChildrenComponet!: QueryList<HeaderComponent>; //static:false default. we cannot change it

  rooms: Room = {
    availablerooms: 7,
    bookedrooms: 90,
    totalrooms: 100
  };



  Totalbyte = 0;
  roomcount!: Observable<number>;

  error$ = new Subject<string>();
  getError = this.error$.asObservable();
  room$!: Observable<RoomDetails[]>; //wiil use async pipe


  //this is dependency injection
  constructor(@SkipSelf() private services: RoomsService, private cdr: ChangeDetectorRef) {
    //As we add @skipSelf,we do not have to have provider in this component,but have to have in parent and appModule
  }



  ngOnInit(): void {
    //console.log(this.headerComponent); when static is true in viewchild
    //console.log("parent ngOnit");
    this.services.refreshNeeded.subscribe(() => {
      this.reload(); // reload on trigger
    });

    this.room$ = this.services.getRoom$.pipe(
      catchError(err => {
        this.error$.next(err);
        return of([]);
      }),
      // Removed invalid assignment
    );

    this.roomcount = this.services.getRoom$.pipe(
      map((r: RoomDetails[]) => r.length)
    );


    this.services.getRoomList().subscribe((data: RoomDetails[]) => {
      this.roomList = data;//it is more faster than without Rjsx shareReplay getRoomList method
    });

    //resi api request
    this.services.getPhotos().subscribe((event: any) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log("Request has been Made!");
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log("Request success");
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.Totalbyte += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          //console.log(event.body);
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
    // this.headerComponent.title = 'frist change titel of header';
    // this.hearderChildrenComponet.last.title = ' frist change titel of header for multiple selector access';
    // console.log(this.headerComponent.title + "call from ngAfterViewInit");
    // this.cdr.detectChanges()
    /*
    Avoiding this error:we use->this.cdr.detectChanges()
    ERROR ->RuntimeError: NG0100: ExpressionChangedAfterItHasBeenCheckedError:
     Expression has changed after it was checked. Previous value: ''. 
     Current value: 'frist change titel of header'. 
     Expression location: _HeaderComponent component. Find more at 
    */
  }
  ngAfterViewChecked(): void {
    //console.log(this.headerComponent.title + "call from ngAfterViewChecked");
  }

  reload() {
    this.services.getRoomList().subscribe((data: RoomDetails[]) => {
      this.roomList = data;
    });
  }

  toggle() {
    this.hiderooms = !this.hiderooms;
    this.Titel = 'Sending Titel from rooms after changes';
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
      checkinTime: '15-dec-2023 14:00:00',
      checkoutTime: '16-dec-2023 12:00:00',
      rating: 4.9
    };
    //this.roomList.push(room);
    // this.roomList = [...this.roomList, room]; Using spread operator to make the list dynamic
    this.services.addRoom(room).subscribe((data) => {
      this.roomList = [...this.roomList, room];
    });
  }

  EditRoom() {
    const room: RoomDetails = {
      roomnumber: 120,
      roomtype: 'Luxury Room Edited',
      amenities: 'AC, TV, WiFi, Mini Bar, Jacuzzi',
      price: 12000,
      checkinTime: '15-dec-2023 14:00:00',
      checkoutTime: '16-dec-2023 12:00:00',
      rating: 4.9
    };

    this.services.editRoom(room).subscribe((data) => {
      this.roomList = this.roomList.map(r =>
        r.roomnumber === room.roomnumber ? room : r
      );
    });

  }

  ReceiveDeletedID(ID: any) {
    this.services.deleteRoom(ID).subscribe(() => {
      this.roomList = this.roomList.filter(room => room.roomnumber !== ID);
    });

  }

}