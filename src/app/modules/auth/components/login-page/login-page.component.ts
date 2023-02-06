import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// material
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  public form: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  // mocking login for now //TODO: fake login
  tryLogin() {
    const { email, password } = this.form.value;

    if (email === 'test@test.com' && password === '123123') {
      console.log('nice');
      this.fakeDelay();
    } else {
      this.openSnackBar();
      this.form.reset();
    }
  }

  // mocking delay //TODO: fake delay
  fakeDelay() {
    this.isLoading = true;
    setTimeout(() => {
      // redirect to //TODO: redirect to
      this.router.navigate(['/', 'dashboard']);
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
