import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromProducts from './products.reducer';

export const productsFeatureName = "products";

export interface ProductsFeatureState {
  products: fromProducts.ProductState;
}

export const reducers: ActionReducerMap<ProductsFeatureState> = {
  products: fromProducts.reducer,
};

export const selectProductsFeature = createFeatureSelector<ProductsFeatureState>(productsFeatureName);