import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'hinv-employee',
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  providers: [RoomsService]
})
export class EmployeeComponent implements OnInit{
 
  EmployeeName='John Doe';
  constructor(private services:RoomsService) { }
  
  ngOnInit(): void {
   
  }

}
