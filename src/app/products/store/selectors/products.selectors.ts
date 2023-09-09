import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsFeatureState, productsFeatureName } from '../reducers';

export const selectProductsFeature = createFeatureSelector<ProductsFeatureState>(productsFeatureName);

export const selectProductsState = createSelector(selectProductsFeature, (state) => state.products);

export const selectProductsEntities = createSelector(selectProductsState, (state) => state.entities);

export const selectProductsLoading = createSelector(selectProductsState, (state) => state.loading);

export const selectProductsloaded = createSelector(selectProductsState, (state) => state.loaded);

export const selectAllProducts = createSelector(selectProductsEntities,
  (entities) => {
    return Object.values(entities);
  }
);

const productsSelectors = {
  selectProductsState,
  selectProductsFeature,
  selectProductsEntities,
  selectProductsLoading,
  selectProductsloaded,
  selectAllProducts
};

export default productsSelectors;
