import { AfterViewInit, Component, ElementRef, Inject, inject, OnInit, Optional, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomsComponent } from "./rooms/rooms.component";
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "./container/container.component";
import { EmployeeComponent } from "./employee/employee.component";
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstroage.token';
import { InitService } from './init.service';
import { NavigationEnd, NavigationStart, RouterModule, RouterOutlet } from '@angular/router';
import { ConfigService } from './services/config.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';



@Component({
  selector: 'hinv-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, FormsModule, RouterModule,RouterOutlet],
})
export class AppComponent implements OnInit, AfterViewInit {


  title = 'hotelinventoryapp';
  role = '';
  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;// create a ViewContainerRef for render it by ng template
  @ViewChild('name', { static: true }) name!: ElementRef//catch the Html tag and insert the text

  constructor(@Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService:ConfigService,
    private router:Router) 
    {
    //As we use Optional decorator ,we donot have to providedIn in loggerService also donot have to provider in this componet
    //we also inject a local stroge token 
    //checking init service is workin
    console.log(initService.config);
  }
  ngOnInit(): void {
    //question mark for avoiding error,we use when logger service is available
    this.loggerService?.log("i am from app Component for loggerService");
    //we can catch name as static is true
    //this.name.nativeElement.innerText = 'Hello from Angular! example of viewchild to access html element';
    //we set and item
    if (typeof window !== 'undefined' && this.localStorage) {
      this.localStorage.setItem('name', 'Hotel California');
    }
     //all events prints
    // this.router.events.subscribe((event)=>{
    //   console.log(event);
    // })
   

    //listenting specific event
    this.router.events.pipe(
      filter((event)=> event instanceof NavigationStart) 
    ).subscribe((event)=>{
      console.log("Navigation Start successfully");
    })

    this.router.events.pipe(
      filter((event)=> event instanceof NavigationEnd) 
    ).subscribe((event)=>{
      console.log("Navigation End successfully");
    })
  }
  ngAfterViewInit(): void {
    //connect with componet and initiated the instance
    //const componentRef = this.vcr.createComponent(RoomsComponent);
    //componentRef.instance.numberOfRooms=50;
  }

  InputRole(value: any) {
    this.role = value;
  }

}
