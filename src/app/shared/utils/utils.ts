import { AbstractControl, FormGroup } from "@angular/forms";

export function passwordMatchValidator(formCurrent: AbstractControl | FormGroup): any {
  const valuePassword = formCurrent.get('password')?.value;
  const valuePasswordConfirm = formCurrent.get('confirmPassword')?.value;

  return valuePassword === valuePasswordConfirm ? null : { mismatch: true };
}
