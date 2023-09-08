import { Component, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from './models/product';
import { TableColumns } from './models/table-columns';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProductComponent } from './create-product/create-product.component';
import { Store } from '@ngrx/store';
import { ProductsFeatureState } from './store/reducers';
import { selectAllProducts } from './store/selectors';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { productsActions } from './store/actions/products.action';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
  ]
})
export class ProductsComponent {
  tableColumns: TableColumns<Product> = {
    id: {
      label: "Id",
    },
    name: {
      label: "Name",
    },
    description: {
      label: "Description",
    },
    ageRestriction: {
      label: "Maximun Age",
    },
    company: {
      label: "Company",
    },
    price: {
      label: "Price",
      type: "currency",
    }
  };
  displayedColumns = [...Object.keys(this.tableColumns), "actions"];
  onDestroy$ = new Subject<void>();
  productsDataSource: MatTableDataSource<Product> = new MatTableDataSource(undefined);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store<ProductsFeatureState>,
  ) {
    store.select(selectAllProducts)
    .pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((products) => {
      this.productsDataSource.data = products;
    });
  }

  ngAfterViewInit() {
    if(this.paginator) {
      this.productsDataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  addProduct() {
    this.dialog.open(CreateProductComponent, {
      height: 'auto',
      width: '600px',
    });
  }

  updateProduct(product: Product) {
    this.dialog.open(CreateProductComponent, {
      height: 'auto',
      width: '600px',
      data: {
        product
      }
    });
  }

  deleteProduct(product: Product) {
    this.store.dispatch(productsActions.removeProduct({ product }));
  }
}
