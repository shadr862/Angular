import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class CustomValidator {
    static ValidateName(control: AbstractControl) {
        const value = control.value as string;
        if (value.includes('test')) {
            return { invalidName: true };
        }

        return null;
    }

    static validateSpecialChar(char: string) {
        return (control: AbstractControl) => {
            const value = control.value as string

            if (value.includes(char)) {
                return { invalidSpecialChar: true };
            }
            return null;

        }
    }
static validateDate(control: FormGroup) {
    const checkinControl = control.get('checkinDate');
    const checkoutControl = control.get('checkoutDate');

    const checkinDate: any = new Date(checkinControl?.value);
    const checkoutDate: any = new Date(checkoutControl?.value);

    // If dates are not valid, don't proceed with validation
    if (isNaN(checkinDate) || isNaN(checkoutDate)) {
        return null;
    }

    const diffTime = checkoutDate - checkinDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log(diffDays);
    console.log(diffTime);

    if (diffDays <= 0) {
        checkoutControl?.setErrors({ invalidDate: true });
        return { invalidDate: true };
    } else {
        // Clear error if previously set and now valid
        if (checkoutControl?.hasError('invalidDate')) {
            checkoutControl.setErrors(null);
        }
    }

    return null;
}


}
