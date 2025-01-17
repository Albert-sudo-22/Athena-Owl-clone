import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { UserService } from '../../user/user.service';
import { Subject } from 'rxjs';
import { SharedGridComponent } from '../../shared-grid/shared-grid.component';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-item1',
  imports: [SharedGridComponent],
  templateUrl: './item1.component.html',
  styleUrl: './item1.component.scss'
})
export class Item1Component implements OnInit, OnDestroy {
  rowData: any[] = [];
  colDefs: any[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchProduct().subscribe((data) => {
      if (data && data.products && data.products.length > 0) {
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
            valueFormatter: (params: { value: any[]; }) => {
              if (params.value && Array.isArray(params.value)) {
                return params.value
                  .map(
                    (review: any) =>
                      `${review.reviewerName}: ${review.rating}/5 - "${review.comment}"`
                  )
                  .join('\n');
              }
              return 'No reviews';
            },
          },
          {
            field: 'meta',
            headerName: 'Meta Info',
            valueFormatter: (params: { value: { createdAt: any; barcode: any; }; }) =>
              `${params.value?.createdAt || ''}, ${params.value?.barcode || ''}`,
          },
          {
            field: 'dimensions',
            headerName: 'Dimensions (Width)',
            valueFormatter: (params: { value: { width: any; }; }) => params.value?.width || '',
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
