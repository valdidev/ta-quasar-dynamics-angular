import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// services
import { AuthService } from '@modules/auth/services/auth.service';
import { CommonService } from '@shared/services/common.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.minLength(10),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        // checking that both passwords match
        validators: passwordMatchValidator,
      }
    );
  }

  tryRegister() {
    const registerBody = this.registerForm.value;

    this.authService.httpPostRegister(registerBody).subscribe({
      next: (res) => {
        this.commonService.openSnackBar('Successfully registered');
        console.log('http post register', res);
        this.router.navigate(['/', 'auth', 'login']);
      },
      error: (err) => {
        const { error } = err.error;
        this.commonService.openSnackBar(error);
        this.registerForm.reset();
      },
    });
  }
}

// fn checks that both passwords match
function passwordMatchValidator(formCurrent: AbstractControl | FormGroup): any {
  const valuePassword = formCurrent.get('password')?.value;
  const valuePasswordConfirm = formCurrent.get('confirmPassword')?.value;

  return valuePassword === valuePasswordConfirm ? null : { mismatch: true };
}
