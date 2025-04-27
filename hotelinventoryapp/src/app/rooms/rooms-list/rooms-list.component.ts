import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { RoomDetails } from '../rooms';
@Component({
  selector: 'hinv-rooms-list',
  imports: [CommonModule],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit,OnChanges{
  @Input() roomList:RoomDetails[]=[];
  @Input() Title:string='';
  @Output() SelectedRoom=new EventEmitter<RoomDetails>();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['Title']){
      this.Title=changes['Title'].currentValue.toUpperCase();
    }
  }
  ngOnInit(): void {  }
  selectRoom(room:RoomDetails){
    this.SelectedRoom.emit(room);
  }
}
