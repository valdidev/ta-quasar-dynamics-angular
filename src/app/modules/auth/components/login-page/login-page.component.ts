import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// material
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  public isLoading: boolean = false;

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // 2. *
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  // mocking login for now //TODO: fake login
  tryLogin() {
    const { email, password } = this.loginForm.value;

    if (email === 'test@test.com' && password === '123123') {
      console.log('nice');
      this.fakeDelay();
    } else {
      this.openSnackBar();
      this.loginForm.reset();
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
