import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { bookingGuard } from "./guards/booking.guard";
import { BookingListComponent } from "./booking-list/booking-list.component";
import { BookingAddComponent } from "./booking-add/booking-add.component";
import { BookingEditComponent } from "./booking-edit/booking-edit.component";



export const BookingRoutes:Routes=[
     {path:'see',component:BookingListComponent},
     {path:'edit',component:BookingEditComponent,canDeactivate:[bookingGuard]},
     {path:':roomid',component:BookingAddComponent,canDeactivate:[bookingGuard]},//keep it always in the end
     
];

