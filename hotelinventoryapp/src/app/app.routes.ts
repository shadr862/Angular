import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { canActivateLoginGuard } from './guards/login.guard';
import { CanLoadGuard } from './guards/canLoad.guard';

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
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];
