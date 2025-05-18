import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmployeeCustomValidator {
  // Validates that the name does not include "test"
  static NameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (value.includes('test')) {
      return { invalidName: true };
    }
    return null;
  }

  // Validates that the value does not include a specific special character
  static SpeecialCharValidator(sp_char: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (value.includes(sp_char)) {
        return { invalidCharecter: true };
      }
      return null;
    };
  }

  // Validates the email format using a regular expression
  static EmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  }
}

