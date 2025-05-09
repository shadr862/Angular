import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomsBookingComponent } from './rooms/rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
// Removed incorrect imports array declaration
   
export const routes: Routes = [
     {path:'employee',component:EmployeeComponent},
     {path:'rooms',component:RoomsComponent},
     {path:'rooms/add',component:RoomsAddComponent},
     {path:'rooms/:roomid',component:RoomsBookingComponent},//dynamic route
     {path:'',redirectTo:'/rooms',pathMatch:'full'},//default
     { path: '**',component:NotfoundComponent } //anything is does not exist go to rooms[wildcard route]
];

