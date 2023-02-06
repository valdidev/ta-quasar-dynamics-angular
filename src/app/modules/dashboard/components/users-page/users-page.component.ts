import { Component } from '@angular/core';
import { User } from '@shared/interfaces/user';

const usersList: User[] = [
  {
    id: 7,
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg',
  },
];

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent {
  public displayedColumns: string[] = ['id', 'email', 'name', 'surname'];
  public dataSource = usersList;
}
