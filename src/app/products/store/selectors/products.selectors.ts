import { createSelector } from '@ngrx/store';
import { selectProductsFeature } from '../reducers';

export const selectProductsState = createSelector(selectProductsFeature, (rootState) => rootState.products);

export const selectProductsEntities = createSelector(selectProductsState, (state) => state.entities);

export const selectProductsLoading = createSelector(selectProductsState, (state) => state.loading);

export const selectProductsloaded = createSelector(selectProductsState, (state) => state.loaded);

export const selectAllProducts = createSelector(selectProductsEntities,
  (entities) => {
    return Object.values(entities);
  }
);
