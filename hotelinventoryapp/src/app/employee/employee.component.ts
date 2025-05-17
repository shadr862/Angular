import { Component, Host, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { RouteConfigToken } from '../services/routeConfig.service';
import { RouterModule } from '@angular/router';
import { EmployeeDetailsGet } from './employee';
import { EmployeeService } from './service/employee.service';
import { EmployeeListComponent } from "./employee-list/employee-list.component";

@Component({
  selector: 'hinv-employee',
  imports: [CommonModule, FormsModule, RouterModule, EmployeeListComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
 // providers: [RoomsService]//if we do not give the service provider ,it will give null injector error
})
export class EmployeeComponent implements OnInit{
 
   //EmployeeName='Employe name inside employe component';
   disableDelete: any;
   employeeList: EmployeeDetailsGet[] = [];
  
  //we create the local services and for adding @self we must add the provider of services
  constructor(/*@Self() private services: RoomsService*/ 
    private configService:ConfigService,
    private employeeService:EmployeeService
  ) { }


  
  ngOnInit(): void {
    if(this.employeeService.refreshNeeded)
    this.employeeService.GetEmployee().subscribe((data) => {
        this.employeeList = data;
    })
  }

  reload()
  {
    this.employeeService.GetEmployee().subscribe((data) => {
        this.employeeList = data;
    })
  }

  DeleteEmployee(id:number)
  {
    this.employeeService.DeleteEmployee(id).subscribe();
    this.employeeList=this.employeeList.filter(e=>e.employeeId!=id)
  }



}
