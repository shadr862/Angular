import { Component, Host, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { RoomDetails } from '../rooms';
import { FormsModule } from '@angular/forms';
import { RoomsService } from '../services/rooms.service';
import { RouterModule } from '@angular/router';
import { FilterPipe } from "../custom_pipe/filter.pipe";
import { SearchPipe } from "../custom_pipe/search.pipe";
import { Router } from '@angular/router';
import { LoggerService } from '../../logger.service';
import { LoginService } from '../../Auth/login-service/login.service';
import { SortPipe } from "../custom_pipe/sort.pipe";



@Component({
  selector: 'hinv-rooms-list',
  standalone:true,
  imports: [CommonModule, FormsModule, RouterModule, FilterPipe, SearchPipe, SortPipe],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit,OnChanges,OnDestroy{
  @Input() roomList:RoomDetails[]=[];
  @Input() Title:string='';
  @Input() Price:number=0;
  @Input() RoomType:string='';
  @Input() priceSortOrder:any;
  @Output() SelectedRoom_rm_list=new EventEmitter<RoomDetails>();
  @Output() DetetedID=new EventEmitter<RoomDetails>();
 
  private _name:string='';
  disabledDelete=true;

  constructor(private service: RoomsService,
    private router:Router,
    private loginService:LoginService) {} // we can use this service without provider as it is part of container which contains the provider and it creates only one instance
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['Title']){
      this.Title=changes['Title'].currentValue.toUpperCase();
    }
  }
  ngOnInit(): void { 
    if(this.loginService.isloggedinAdmin)
    {
       this.disabledDelete=false;
    }
   }
  
  ngOnDestroy(): void {
    console.log('rooms list component is destroyed');
  }

  selectRoom(room:RoomDetails){
    this.SelectedRoom_rm_list.emit(room);
  }
  EditRoom(room:any)
  {
    this.router.navigate(['/ds/rooms', 'edit'], { state: { room }});
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
