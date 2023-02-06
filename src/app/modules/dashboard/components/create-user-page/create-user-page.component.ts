import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@modules/dashboard/services/users.service';
import { User } from '@shared/interfaces/user';

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

    this.usersService.postUser(userBody);
    this.router.navigate(['/', 'dashboard']);
  }
}
