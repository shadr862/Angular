import { CanDeactivateFn } from '@angular/router';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { EmloyeeEditComponent } from '../emloyee-edit/emloyee-edit.component';

export const employeeCanDeactivateGuard: CanDeactivateFn<EmployeeAddComponent|EmloyeeEditComponent> = (component, currentRoute, currentState, nextState) => {
  const snackBar=inject(MatSnackBar);

  if (component.EmployeeForm.pristine) {
    return true;
  }
  const ref = snackBar.open(
    'You have unsaved changes. Click YES to leave.',
    'YES',
    { duration: 5000 } // or remove to keep it until user clicks
  );
  return ref.onAction().pipe(
    switchMap(()=> of(true))
  );
};
