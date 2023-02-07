import { Component, OnInit, ViewChild } from '@angular/core';

// angular material
import { MatTableDataSource } from '@angular/material/table';

// interfaces
import { User } from '@shared/interfaces/user';

// services
import { CommonService } from '@shared/services/common.service';
import { UsersService } from '@modules/dashboard/services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  public usersList: User[] = [];
  public copyArray: User[] = [];

  // mat table filter property
  public dataSource!: MatTableDataSource<any>;

  public displayedColumns: string[] = [
    'id',
    'email',
    'name',
    'surname',
    'actions',
  ];

  constructor(
    private usersService: UsersService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    // http get all users service
    this.usersService.httpGetUsers().subscribe((response) => {
      this.usersList = response;

      // copy of array simulating deletion
      this.copyArray = this.usersList.slice();

      // filling mat table
      this.dataSource = new MatTableDataSource(this.copyArray);
    });
  }

  refreshUsers() {
    // refilling on each elimination
    this.dataSource = new MatTableDataSource(this.copyArray);
  }

  // MAT TABLE FILTER
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // DELETE USER
  removeUser(user: User, userIndex: number) {
    // remove user from array copy
    this.copyArray.splice(userIndex, 1);

    // http delete request to API
    this.usersService.deleteUserById(user.id).subscribe({
      next: () => {
        console.log('http delete sent to user with id:', user.id);
        this.commonService.openSnackBar(
          `User ${user.email} deleted successfully`
        );
      },
      error: (err) => {
        console.log(err);
        this.commonService.openSnackBar();
      },
    });

    // refreshing table to see changes
    this.refreshUsers();
  }
}
