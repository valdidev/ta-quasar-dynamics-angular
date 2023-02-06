import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
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
  tryRegister() {
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
