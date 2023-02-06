import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '@shared/utils/utils';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  public isLoading: boolean = false;

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
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
        validators: passwordMatchValidator(this.registerForm),
      }
    );
  }

  // mocking login for now //TODO: fake login
  tryRegister() {
    const { email, password } = this.registerForm.value;

    if (email === 'test@test.com' && password === '123123') {
      console.log('nice');
      this.fakeDelay();
    } else {
      this.openSnackBar();
      this.registerForm.reset();
    }
  }

  // mocking delay //TODO: fake delay
  fakeDelay() {
    this.isLoading = true;
    setTimeout(() => {
      // redirect to //TODO: redirect to
      this.router.navigate(['/', 'auth', 'login']);
    }, 1500);
  }

  // TODO: service
  openSnackBar() {
    this.snackBar.open('Wrong email or password', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
