import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product';
import { productsActions } from '../actions/products.action';

export interface ProductState {
  entities: { [id: number]: Product };
  loaded: boolean;
  loading: boolean;
}

export const initialState: ProductState = {
  entities: {},
  loaded: false,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(productsActions.loadProducts, (state, _) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(productsActions.loadProductsSuccess, (state, action) => {
    const products = action.products;
    const entities = products.reduce(
      (entities: { [id: number]: Product }, product: Product) => {
        return {
          ...entities,
          [product.id]: product,
        };
      },
      {
        ...state.entities,
      }
    );
    return {
      ...state,
      loading: false,
      loaded: true,
      entities,
    };
  }),
  on(productsActions.loadProductsFail, (state, action) => {
    return {
      ...state,
      loading: false,
      loaded: false,
    };
  }),
  on(productsActions.createProductSuccess, productsActions.updateProductSuccess, (state, action) => {
    const product = action.product;
    const entities = {
      ...state.entities,
      [product.id]: product,
    };

    return {
      ...state,
      entities,
    };
  }),
  on(productsActions.removeProductSuccess, (state, action) => {
    const product = action.product;
    const { [product.id]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities,
    };
  })
);
