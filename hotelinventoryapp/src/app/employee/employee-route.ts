import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmloyeeEditComponent } from './emloyee-edit/emloyee-edit.component';

export const employeeRoutes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'add',component:EmployeeAddComponent},
  { path: 'edit',component:EmloyeeEditComponent}
];
