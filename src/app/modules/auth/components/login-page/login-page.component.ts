import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
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
    } else {
      this.openSnackBar()
    }
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
