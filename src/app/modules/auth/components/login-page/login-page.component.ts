import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// services
import { TokenService } from '@modules/auth/services/token.service';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  public isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
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

  tryLogin() {
    const loginBody = this.loginForm.value;

    this.authService.httpPostLogin(loginBody).subscribe({
      next: (res) => {
        const { token } = res;
        console.log(token);
        this.tokenService.setToken(token);
        console.log(token);
        this.loader();
      },
      error: (err) => {
        const { error } = err.error;
        this.openSnackBar(error);
        this.loginForm.reset();
      },
    });
  }

  loader() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/', 'dashboard']);
    }, 1500);
  }

  openSnackBar(msg: string = 'Wrong email or password') {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
