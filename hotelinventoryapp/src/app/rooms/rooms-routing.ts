import { Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { roomsGuard } from './guards/rooms.guard';

// Updated roomsRoutes for nested routes under the "dashboard" route
export const roomsRoutes: Routes = [
  {
    path: '', // This will match 'dashboard/rooms'
    component: RoomsComponent,
    canActivateChild:[roomsGuard],
    children: [
      {
        path: 'add', // This will match 'dashboard/rooms/add'
        component: RoomsAddComponent
      },
      {
        path: ':roomid', // This will match 'dashboard/rooms/:roomid'
        component: RoomsBookingComponent
      }
    ]
  }
];

