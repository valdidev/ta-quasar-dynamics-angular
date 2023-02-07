import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '@modules/dashboard/services/users.service';
import { User } from '@shared/interfaces/user';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css'],
})
export class UserDetailsPageComponent implements OnInit {

  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    const { userId } = this.route.snapshot.params;

    this.usersService.httpGetUserById(userId).subscribe({
      next: (res) => {
        const { data } = res;
        this.user = data;
        console.log(this.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
