import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { ProductState, reducer } from './products.reducer';

export const productsFeatureName = "products";

export interface ProductsFeatureState {
  products: ProductState;
}

export const reducers: ActionReducerMap<ProductsFeatureState> = {
  products: reducer,
};
