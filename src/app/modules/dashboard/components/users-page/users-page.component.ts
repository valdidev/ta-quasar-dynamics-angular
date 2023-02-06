import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '@modules/dashboard/services/users.service';
import { User } from '@shared/interfaces/user';

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

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
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
  deleteUser(userId: number) {
    console.log(userId);
  }
}
