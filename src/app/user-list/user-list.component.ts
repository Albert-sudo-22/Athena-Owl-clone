import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { SharedGridComponent } from '../shared-grid/shared-grid.component';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatPaginatorModule, SharedGridComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  rowData: any[] = [];
  colDefs: ColDef[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.setupColumns();
  }

  fetchUsers(): void {
    this.userService.fetchUsers().subscribe({
      next: (data) => {
        this.rowData = data.users; // Set the user data for the grid
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  setupColumns(): void {
    this.colDefs = [
      { field: 'id', headerName: 'ID'},
      {field: 'name', headerName: 'Name',
        valueGetter: (params) => `${params.data.firstName} ${params.data.lastName}`,
      },
      { field: 'username', headerName: 'User Name'},
      { field: 'role', headerName: 'Role'},
      { field: 'email', headerName: 'Email'},
    ];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

