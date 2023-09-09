import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { ProductsService } from '../../products.service';
import { ProductsEffects } from './products.effect';
import { Product } from '../../models/product';
import { productsActions } from '../actions/products.action';
import { provideMockActions } from "@ngrx/effects/testing";
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ProductsEffects', () => {
  let actions$: Observable<unknown>;
  let service: ProductsService;
  let effects: ProductsEffects;

  const product1: Product = { id: 1, name: 'Product #1', company: "Test Company", price: 1 };

  const products: Product[] = [product1];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        ProductsEffects,
        MatSnackBar,
        provideMockActions(() => actions$)
      ],
    });

    service = TestBed.inject(ProductsService);
    effects = TestBed.inject(ProductsEffects);

    spyOn(service, 'getProducts').and.returnValue(of(products));
    spyOn(service, 'createProduct').and.returnValue(of(products[0]));
    spyOn(service, 'updateProduct').and.returnValue(of(true));
    spyOn(service, 'deleteProduct').and.returnValue(of(false));
  });

  describe('loadProducts$', () => {
    it('should return a collection from LoadProductsSuccess', () => {
      const action = productsActions.loadProducts();
      const completion = productsActions.loadProductsSuccess({ products });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadProducts$).toBeObservable(expected);
    });
  });

  describe('createProduct$', () => {
    it('should work', () => {
      const action = productsActions.createProduct({ product: products[0] });
      const completion = productsActions.createProductSuccess({ product: products[0] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.createProduct$).toBeObservable(expected);
    });
  });

  describe('updateProduct$', () => {
    it('should work', () => {
      const action = productsActions.updateProduct({ product: products[0] });
      const completion = productsActions.updateProductSuccess({ product: products[0] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.updateProduct$).toBeObservable(expected);
    });
  });

  describe('removeProduct$', () => {
    it('should work', () => {
      const action = productsActions.removeProduct({ product: products[0] });
      const completion = productsActions.removeProductSuccess({ product: products[0] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.removeProduct$).toBeObservable(expected);
    });
  });
});
