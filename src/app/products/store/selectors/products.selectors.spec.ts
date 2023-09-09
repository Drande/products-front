import { StoreModule, Store } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';
import { Product } from '../../models/product';
import { ProductsFeatureState, productsFeatureName, reducers } from '../reducers';
import { rootReducers } from 'src/app/store';
import productsSelectors from './products.selectors';
import { productsActions } from '../actions/products.action';
import { firstValueFrom } from "rxjs";

describe('Products Selectors', () => {
  let store: Store<ProductsFeatureState>;

  const product1: Product = { id: 1, name: 'Product #1', company: "Test Company", price: 1 };
  const product2: Product = { id: 2, name: 'Product #2', company: "Test Company", price: 1 };
  const product3: Product = { id: 3, name: 'Product #3', company: "Test Company", price: 1 };

  const products: Product[] = [product1, product2, product3];

  const entities = {
    1: products[0],
    2: products[1],
    3: products[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ ...rootReducers, }),
        StoreModule.forFeature(productsFeatureName, reducers)
      ],
    });

    store = TestBed.inject(Store<ProductsFeatureState>);
  });

  describe('selectProductsState', () => {
    it('should return state of product store slice', async () => {

      let result = await firstValueFrom(store.select(productsSelectors.selectProductsState));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false,
      });

      store.dispatch(productsActions.loadProductsSuccess({ products }));
      
      result = await firstValueFrom(store.select(productsSelectors.selectProductsState));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false,
      });
    });
  });

  describe('selectProductsEntities', () => {
    it('should return products as entities', async () => {  
      let result = await firstValueFrom(store.select(productsSelectors.selectProductsEntities));

      expect(result).toEqual({});

      store.dispatch(productsActions.loadProductsSuccess({ products }));

      result = await firstValueFrom(store.select(productsSelectors.selectProductsEntities));

      expect(result).toEqual(entities);
    });
  });

  describe('selectAllProducts', () => {
    it('should return products as an array', async () => {
      let result = await firstValueFrom(store.select(productsSelectors.selectAllProducts));

      expect(result).toEqual([]);

      store.dispatch(productsActions.loadProductsSuccess({ products }));

      result = await firstValueFrom(store.select(productsSelectors.selectAllProducts));

      expect(result).toEqual(products);
    });
  });

  describe('selectProductsloaded', () => {
    it('should return the products loaded state', async () => {
      let result = await firstValueFrom(store.select(productsSelectors.selectProductsloaded));

      expect(result).toEqual(false);

      store.dispatch(productsActions.loadProductsSuccess({ products: [] }));

      result = await firstValueFrom(store.select(productsSelectors.selectProductsloaded));

      expect(result).toEqual(true);
    });
  });

  describe('selectProductsLoading', () => {
    it('should return the products loading state', async () => {
        let result = await firstValueFrom(store.select(productsSelectors.selectProductsLoading));

      expect(result).toEqual(false);

      store.dispatch(productsActions.loadProducts());

      result = await firstValueFrom(store.select(productsSelectors.selectProductsLoading));

      expect(result).toEqual(true);
    });
  });
});
