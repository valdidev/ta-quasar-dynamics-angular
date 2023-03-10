import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// services
import { AuthService } from '@modules/auth/services/auth.service';
import { CommonService } from '@shared/services/common.service';

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
    private commonService: CommonService,
    private router: Router
  ) {}
  
  /* Form validations */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(10),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
    });
  }
  
  tryLogin() {
    const loginBody = this.loginForm.value;

    this.authService.httpPostLogin(loginBody).subscribe({
      next: (res) => {
        const { token } = res;
        localStorage.setItem('reqres_token', token);
        console.log('http post login', res);
        this.fakeLoader();
      },
      error: (err) => {
        const { error } = err.error;
        this.commonService.openSnackBar(error);
        this.loginForm.reset();
      },
    });
  }

  fakeLoader() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/', 'dashboard']);
    }, 1500);
  }
}
