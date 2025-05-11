import { Component, Host, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { RouteConfigToken } from '../services/routeConfig.service';

@Component({
  selector: 'hinv-employee',
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
 // providers: [RoomsService]//if we do not give the service provider ,it will give null injector error
})
export class EmployeeComponent implements OnInit{
 
  EmployeeName='Employe name inside employe component';
  constructor(/*@Self() private services: RoomsService*/ private configService:ConfigService) { 
     //we create the local services and for adding @self we must add the provider of services
  }
  
  ngOnInit(): void {
   
  }

}
