import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[hinvEmailvalidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailvalidatorDirective, multi: true}]
})
export class EmailvalidatorDirective implements Validator{

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }
  

}
