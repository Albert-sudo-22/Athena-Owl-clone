import { Component, Input } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { AgGridAngular } from "ag-grid-angular";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-grid',
  imports: [AgGridAngular, MatPaginatorModule, CommonModule],
  templateUrl: './shared-grid.component.html',
  styleUrl: './shared-grid.component.scss'
})
export class SharedGridComponent {
  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  @Input() pagination: boolean = true;
  @Input() usePaginator: boolean = false;

  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 20, 50];
  private unsubscribe$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}

  onGridReady(params: GridReadyEvent): void {
    console.log('Grid is ready:', params);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
