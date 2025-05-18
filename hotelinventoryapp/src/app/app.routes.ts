import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

import { AppNavComponent } from './app-nav/app-nav.component';
import { canActivateLoginGuard } from './guards/login.guard';
import { CanLoadGuard } from './guards/canLoad.guard';
import { BookingListComponent } from './booking/booking-list/booking-list.component';
import { BookingAddComponent } from './booking/booking-add/booking-add.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';

export const routes: Routes = [
  {
    path: 'ds',
    component: AppNavComponent,
    canActivate: [canActivateLoginGuard], // ✅ Guard applied here
    children: [
      {
        path: 'rooms',
        loadChildren: () =>
        import('./rooms/rooms-routing').then((m) => m.roomsRoutes),
        canLoad: [CanLoadGuard]
        
      },
      {
        path: 'employee',
        loadChildren: () =>
        import('./employee/employee-route').then((m) => m.employeeRoutes),
        canLoad: [CanLoadGuard]
      },
      {
        path: 'booking',
        loadChildren: () =>
        import('./booking/booking-routes').then((m) => m.BookingRoutes),
        canLoad: [CanLoadGuard]
      },
      { path: '', redirectTo: 'rooms', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];
