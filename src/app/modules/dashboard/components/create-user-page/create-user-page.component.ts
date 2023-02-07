import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@shared/interfaces/user';

// services
import { UsersService } from '@modules/dashboard/services/users.service';
import { CommonService } from '@shared/services/common.service';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.css'],
})
export class CreateUserPageComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  createUser() {
    const { email, name, surname } = this.form.value;

    const userBody: User = {
      // simulating the id that the api would be assigned
      id: this.usersService.generateID(),
      email,
      first_name: name,
      last_name: surname,
    };

    this.usersService.postUser(userBody).subscribe({
      next: (res) => {
        this.commonService.openSnackBar(`User ${userBody.email} created successfully`);
        this.router.navigate(['/', 'dashboard']);
      },
      error: (err) => {
        this.commonService.openSnackBar();
        console.log(err);
      },
    });
  }
}
