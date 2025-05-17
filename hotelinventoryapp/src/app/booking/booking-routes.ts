import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { bookingGuard } from "./guards/booking.guard";
import { BookingListComponent } from "./booking-list/booking-list.component";
import { BookingAddComponent } from "./booking-add/booking-add.component";



export const BookingRoutes:Routes=[
     {path:'see',component:BookingListComponent},
     {path:':roomid',component:BookingAddComponent,canDeactivate:[bookingGuard]},
];

