import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  displayedColumns: string[] = ['id', 'name', 'role', 'username', 'email'];
  private unsubscribe$ = new Subject<void>();

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchUsers(): void {
    this.userService.fetchUsers().subscribe({
      next: (data) => {
        this.dataSource.data = data.users; // Set data directly
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

