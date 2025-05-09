import { Component, Host, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { RoomDetails } from '../rooms';
import { FormsModule } from '@angular/forms';
import { RoomsService } from '../services/rooms.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hinv-rooms-list',
  imports: [CommonModule,FormsModule,RouterModule],
  standalone:true,
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit,OnChanges,OnDestroy{
  @Input() roomList:RoomDetails[] | null =[];
  @Input() Title:string='';
  @Output() SelectedRoom_rm_list=new EventEmitter<RoomDetails>();
  @Output() DetetedID=new EventEmitter<RoomDetails>();
  private _name:string='';

  constructor(private service: RoomsService) {} // we can use this service without provider as it is part of container which contains the provider and it creates only one instance
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['Title']){
      this.Title=changes['Title'].currentValue.toUpperCase();
    }
  }
  ngOnInit(): void {  }
  
  ngOnDestroy(): void {
    console.log('rooms list component is destroyed');
  }

  selectRoom(room:RoomDetails){
    this.SelectedRoom_rm_list.emit(room);
  }
  DeleteRoom(ID:any)
  {
     this.DetetedID.emit(ID);
  }
 //implementation of two way binding
  get name():string
  {
    return this._name;
  }

  set name(value:string)
  {
      this._name=value;
      if(value=="Riaz")
      {
        alert("You typed Riaz !welcome man");
      }
  }
  
}
