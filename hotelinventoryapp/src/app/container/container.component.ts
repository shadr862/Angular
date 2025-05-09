import { AfterContentChecked, AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { After } from 'v8';
import { EmployeeComponent } from '../employee/employee.component';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  providers:[RoomsService]
})
export class ContainerComponent implements OnInit,AfterContentInit,AfterContentChecked{

  constructor(@Host() private services:RoomsService){}
  
  //If we want use content child,we can use only these componet which i define it inside the ng conten in app.html
  //we can not do this:{static:true}.the dafult is false and fixed.so ngonit is not availabe for this
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  ngOnInit(): void {

  }
  ngAfterContentInit(): void {
    this.employee.EmployeeName = 'Change the Employe name using ContentChild';
  }

  ngAfterContentChecked(): void {
    //it will be used when we want to detect multiple change of the content
  }
  

}
