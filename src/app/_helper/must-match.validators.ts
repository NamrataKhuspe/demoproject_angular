import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        console.log("formGroup", formGroup);
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            console.log("if --------------");
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        console.log("control value ----- > " , control.value);
        console.log("matchingControl.value =-- > " ,matchingControl.value);
        if (control.value !== matchingControl.value) {
            console.log("set errorrr ");
            matchingControl.setErrors({ mustMatch: true });
        } else {
            console.log("elsssssssslseee");
            matchingControl.setErrors(null);
        }
    }
}
