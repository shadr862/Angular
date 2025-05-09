import { Component, Host, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'hinv-employee',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
 // providers: [RoomsService]//if we do not give the service provider ,it will give null injector error
})
export class EmployeeComponent implements OnInit{
 
  EmployeeName='Employe name inside employe component';
  constructor(/*@Self() private services: RoomsService*/ ) { 
     //we create the local services and for adding @self we must add the provider of services
  }
  
  ngOnInit(): void {
   
  }

}
