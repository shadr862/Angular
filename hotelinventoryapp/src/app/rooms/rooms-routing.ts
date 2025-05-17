import { Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { roomsGuard } from './guards/rooms.guard';
import { RoomsEditComponent } from './rooms-edit/rooms-edit.component';

// Updated roomsRoutes for nested routes under the "dashboard" route
export const roomsRoutes: Routes = [
  {
    path: '', // This will match 'dashboard/rooms'
    component: RoomsComponent,
    canActivateChild:[roomsGuard],
    children: [
      {
        path: 'add', // This will match 'ds/rooms/add'
        component: RoomsAddComponent
      },
      {
        path: 'edit', // This will match 'ds/rooms/edit'
        component: RoomsEditComponent
      }
      // {
      //   path: ':roomid', // This will match 'ds/rooms/:roomid'
      //   component: BookingComponent
      // }
    ]
  }
];

