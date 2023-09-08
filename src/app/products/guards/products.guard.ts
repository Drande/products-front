import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/internal/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { productsActions } from '../store/actions/products.action';
import { selectProductsloaded } from '../store/selectors';
import { ProductsFeatureState } from '../store/reducers';

export const productsGuard: CanActivateFn = () => {
  const store: Store<ProductsFeatureState> = inject(Store<ProductsFeatureState>);
  return checkStore(store).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
}


const checkStore = (store: Store<ProductsFeatureState>): Observable<boolean> => {
  return store.select(selectProductsloaded).pipe(
    tap(loaded => {
      if (!loaded) {
        store.dispatch(productsActions.loadProducts());
      }
    }),
    filter(loaded => loaded),
    take(1)
  );
}