import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeDetailsGet } from '../employee';
import { Router } from '@angular/router';


@Component({
  selector: 'hinv-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {

  @Input() disableDelete: any;
  @Input() employeeList: EmployeeDetailsGet[]=[];
  @Output() deletedId = new EventEmitter<number>();

  constructor(private router:Router){}

  onDeleteEmployee(Id: number) {
    this.deletedId.emit(Id);
  }
  onEditEmployee(emp:any)
  {
    this.router.navigate(['/ds/employee','edit'],{state:{emp}})
  }
}
