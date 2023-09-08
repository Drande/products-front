import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ProductsService } from '../../products.service';
import { of } from 'rxjs/internal/observable/of';
import { productsActions } from '../actions/products.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private readonly productService: ProductsService,
    private readonly snackBar: MatSnackBar,
  ) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.loadProducts),
    switchMap(() => {
      return this.productService.getProducts()
      .pipe(
        map(products => productsActions.loadProductsSuccess({ products })),
        catchError(error => of(productsActions.loadProductsFail({ error })))
      );
    })
  ));

  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.createProduct),
    map((action) => action.product),
    switchMap(product => {
      return this.productService
        .createProduct(product)
        .pipe(
          map(product => productsActions.createProductSuccess({ product })),
          catchError(error => of(productsActions.createProductFail({ error })))
        );
    })
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.updateProduct),
    map((action) => action.product),
    switchMap(product => {
      return this.productService
        .updateProduct(product.id, product)
        .pipe(
          map(_ => productsActions.updateProductSuccess({ product })),
          catchError(error => of(productsActions.updateProductFail({ error })))
        );
    })
  ));

  removeProduct$ = createEffect(() => this.actions$.pipe(
    ofType(productsActions.removeProduct),
    map((action) => action.product),
    switchMap(product => {
      return this.productService
        .deleteProduct(product.id)
        .pipe(
          map(() => {
            return productsActions.removeProductSuccess({ product });
          }),
          catchError(error => {
            return of(productsActions.removeProductFail({ error }));
          })
        );
    })
  ));
  
  handleProductFail$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        productsActions.createProductFail,
        productsActions.updateProductFail,
        productsActions.removeProductFail
      ),
      map((action) => {
        switch(action.type) {
          case productsActions.createProductFail.type:
            this.snackBar.open("An error occurred trying to create the product");
            break;
          case productsActions.updateProductFail.type:
            this.snackBar.open("An error occurred trying to update the product");
            break;
          case productsActions.removeProductFail.type:
            this.snackBar.open("An error occurred trying to remove the product");
            break;
        }
        return productsActions.loadProducts();
      }),
  ));

  handleProductSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        productsActions.createProductSuccess,
        productsActions.updateProductSuccess,
        productsActions.removeProductSuccess
      ),
      map((action) => {
        switch(action.type) {
          case productsActions.createProductSuccess.type:
            this.snackBar.open("Product created successfully");
            break;
          case productsActions.updateProductSuccess.type:
            this.snackBar.open("Product updated successfully");
            break;
          case productsActions.removeProductSuccess.type:
            this.snackBar.open("Product removed successfully");
            break;
        }
        return productsActions.loadProducts();
      })
  ));
}
