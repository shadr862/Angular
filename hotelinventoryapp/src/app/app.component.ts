import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren, ViewContainerRef, ViewRef } from '@angular/core';
import { RoomsComponent } from "./rooms/rooms.component";
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "./container/container.component";
import { EmployeeComponent } from "./employee/employee.component";


@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, ContainerComponent, RoomsComponent, EmployeeComponent],
  standalone: true,
})
export class AppComponent implements OnInit,AfterViewInit {
  
  
  title = 'hotelinventoryapp';
  role = 'admin'; 
 // @ViewChild('user',{read:ViewContainerRef}) vcr!:ViewContainerRef;
  @ViewChild('name',{static:true}) name!:ElementRef

  ngOnInit(): void {
    this.name.nativeElement.innerText = 'Hello from Angular!';
  }
  ngAfterViewInit(): void {
    //const componentRef = this.vcr.createComponent(RoomsComponent);
    //componentRef.instance.numberOfRooms=50;
  }

}
