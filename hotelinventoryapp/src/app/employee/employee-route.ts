import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmloyeeEditComponent } from './emloyee-edit/emloyee-edit.component';
import { employeeCanActivateGuard } from './guards/employee-can-activate.guard';
import { employeeCanDeactivateGuard } from './guards/employee-can-deactivate.guard';


export const employeeRoutes: Routes = [
  { path: '', component: EmployeeComponent},
  { path: 'add',component:EmployeeAddComponent,canActivate:[employeeCanActivateGuard],canDeactivate:[employeeCanDeactivateGuard]},
  { path: 'edit',component:EmloyeeEditComponent,canActivate:[employeeCanActivateGuard],canDeactivate:[employeeCanDeactivateGuard]}
];
