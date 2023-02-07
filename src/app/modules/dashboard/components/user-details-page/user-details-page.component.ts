import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// interfaces
import { User } from '@modules/dashboard/interfaces/user';

// services
import { UsersService } from '@modules/dashboard/services/users.service';
import { CommonService } from '@shared/services/common.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css'],
})
export class UserDetailsPageComponent implements OnInit {
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    const { userId } = this.route.snapshot.params;

    // http get user by id service
    this.usersService.httpGetUserById(userId).subscribe({
      next: (res) => {
        const { data } = res;
        this.user = data;
        console.log('http get user by id', data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeUser(user: User) {
    // http delete user service
    this.usersService.deleteUserById(user.id).subscribe({
      next: () => {
        console.log('http delete sent to user with id:', user.id);
        this.router.navigate(['/', 'dashboard']);
        this.commonService.openSnackBar(
          `User ${user.email} deleted successfully`
        );
      },
      error: (err) => {
        console.log(err);
        this.commonService.openSnackBar();
      },
    });
  }
}
