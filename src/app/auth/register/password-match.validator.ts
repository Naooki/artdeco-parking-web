import { FormGroup, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (group: FormGroup) => {
    const [v1, v2] = [
      group.get('password1')?.value,
      group.get('password2')?.value,
    ];
    return v1 && v2 && v1 === v2 ? null : { passwordsDontMatch: true };
  };
}
