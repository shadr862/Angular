import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomsComponent } from "./rooms/rooms.component";
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "./container/container.component";
import { EmployeeComponent } from "./employee/employee.component";


@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, ContainerComponent, RoomsComponent, EmployeeComponent, FormsModule],
  standalone: true,
})
export class AppComponent implements OnInit,AfterViewInit {
  
  
  title = 'hotelinventoryapp';
  role = ''; 
  @ViewChild('user',{read:ViewContainerRef}) vcr!:ViewContainerRef;// create a ViewContainerRef for render it by ng template
  @ViewChild('name',{static:true}) name!:ElementRef//catch the Html tag and insert the text

  ngOnInit(): void {
    //we can catch name as static is true
    this.name.nativeElement.innerText = 'Hello from Angular! example of viewchild to access html element';
  }
  ngAfterViewInit(): void {
    //connect with componet and initiated the instance
    //const componentRef = this.vcr.createComponent(RoomsComponent);
    //componentRef.instance.numberOfRooms=50;
  }

  InputRole(value:any){
    this.role=value;
  }

}
