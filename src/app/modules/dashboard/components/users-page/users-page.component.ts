import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '@modules/dashboard/services/users.service';
import { User } from '@shared/interfaces/user';
import { CommonService } from '@shared/services/common.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  public usersList: User[] = [];

  public displayedColumns: string[] = [
    'id',
    'email',
    'name',
    'surname',
    'actions',
  ];

  public dataSource!: MatTableDataSource<any>;

  // mat pagination and sort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private usersService: UsersService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadApiUsers();
  }

  loadApiUsers() {
    this.usersService.httpGetUsers().subscribe((response) => {
      console.log(response);
    });
  }

  loadUsers() {
    this.usersList = this.usersService.getUsers();
    this.dataSource = new MatTableDataSource(this.usersList);
  }

  // mat table search bar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // actions
  removeUser(user: User, userIndex: number) {
    this.usersService.deleteUserById(user.id, userIndex).subscribe({
      next: (res) => {
        this.commonService.openSnackBar(
          `User ${user.email} deleted successfully`
        );
      },
      error: (err) => {
        console.log(err);
        this.commonService.openSnackBar();
      },
    });

    this.loadUsers();
  }
}
