import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { RoomDetails } from '../rooms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'hinv-rooms-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit,OnChanges,OnDestroy{
  @Input() roomList:RoomDetails[]=[];
  @Input() Title:string='';
  @Output() SelectedRoom_rm_list=new EventEmitter<RoomDetails>();
  private _name:string='';
  constructor() { }
  
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
