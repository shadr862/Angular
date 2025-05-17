import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CanDeactivateFn } from '@angular/router';
import { BookingAddComponent } from '../booking-add/booking-add.component';

export const bookingGuard: CanDeactivateFn<BookingAddComponent> = (
  component
): Observable<boolean> | boolean => {
  const snackBar = inject(MatSnackBar);

  if (component.BookingForm.pristine) {
    return true;
  }

  const ref = snackBar.open(
    'You have unsaved changes. Click YES to leave.',
    'YES',
    { duration: 5000 } // or remove to keep it until user clicks
  );

  // Return an observable that resolves to true if user clicked YES
  return ref.onAction().pipe(
    switchMap(() => of(true)) // User clicked "YES"
  );

  // If snackbar times out or is dismissed without action, it returns false automatically by guard
};

