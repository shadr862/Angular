import { AfterContentInit, Component, ContentChild, OnInit } from '@angular/core';
import { After } from 'v8';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'hinv-container',
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements OnInit,AfterContentInit{
  
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  ngOnInit(): void {

  }
  ngAfterContentInit(): void {
    this.employee.EmployeeName = 'John';
  }

}
