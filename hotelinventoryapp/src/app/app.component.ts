import { AfterViewInit, Component, ElementRef, Inject, inject, OnInit, Optional, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomsComponent } from "./rooms/rooms.component";
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "./container/container.component";
import { EmployeeComponent } from "./employee/employee.component";
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstroage.token';


@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, ContainerComponent, RoomsComponent, EmployeeComponent, FormsModule],
})
export class AppComponent implements OnInit,AfterViewInit {
  
  
  title = 'hotelinventoryapp';
  role = ''; 
  @ViewChild('user',{read:ViewContainerRef}) vcr!:ViewContainerRef;// create a ViewContainerRef for render it by ng template
  @ViewChild('name',{static:true}) name!:ElementRef//catch the Html tag and insert the text
  
  constructor(@Optional() private loggerService: LoggerService, @Inject(localStorageToken) private localStorage:Storage ){
    //As we use Optional decorator ,we donot have to providedIn in loggerService also donot have to provider in this componet
    //we also inject a local stroge token 
  }
  ngOnInit(): void {
    //question mark for avoiding error,we use when logger service is available
    this.loggerService?.log("i am from app Component for loggerService");
    //we can catch name as static is true
    this.name.nativeElement.innerText = 'Hello from Angular! example of viewchild to access html element';
    //we set and item
    this.localStorage.setItem('name','Hotel California');
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
