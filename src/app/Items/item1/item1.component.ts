import { Component } from '@angular/core';
import { AgGridAngular } from "ag-grid-angular";
import type { ColDef, GridReadyEvent } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { UserService } from '../../user/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subject } from 'rxjs';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-item1',
  imports: [AgGridAngular, MatPaginator, MatPaginatorModule],
  templateUrl: './item1.component.html',
  styleUrl: './item1.component.scss'
})
export class Item1Component {
  rowData: any[] = [];
  colDefs: ColDef[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService) {}

  onGridReady(params: GridReadyEvent) {
    this.userService.fetchProduct().subscribe((data) => {
      if (data && data.products && data.products.length > 0) {
        console.log(data);
        this.rowData = data.products;

        this.colDefs = [
          { field: 'id', headerName: 'ID' },
          { field: 'title', headerName: 'Title' },
          { field: 'description', headerName: 'Description' },
          { field: 'category', headerName: 'Category' },
          { field: 'price', headerName: 'Price' },
          { field: 'rating', headerName: 'Overall Rating' },
          { field: 'stock', headerName: 'Stock' },
          {
            field: 'reviews',
            headerName: 'Reviews',
            valueFormatter: (params) => {
              if (params.value && Array.isArray(params.value)) {
                return params.value
                  .map((review: any) => `${review.reviewerName}: ${review.rating}/5 - "${review.comment}"`)
                  .join('\n');
              }
              return 'No reviews';
            },
          },
          {
            field: 'meta',
            headerName: 'Meta Info',
            valueFormatter: (params) =>
              `${params.value?.createdAt || ''}, ${params.value?.barcode || ''}`,
          },
          {
            field: 'dimensions',
            headerName: 'Dimensions (Width)',
            valueFormatter: (params) => params.value?.width || '',
          },
        ];
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
