import { reducer, initialState } from "./products.reducer";
import { productsActions } from "../actions/products.action";
import { Product } from "../../models/product";

describe('ProductsReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loadProducts action', () => {
    it('should set loading to true', () => {
      const action = productsActions.loadProducts;
      const state = reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('loadProductsSuccess action', () => {
    it('should populate the products array', () => {
      const products: Product[] = [
        { id: 1, name: 'Product #1', company: "Test Company", price: 1 },
        { id: 2, name: 'Product #2', company: "Test Company", price: 1 },
      ];
      const entities = {
        1: products[0],
        2: products[1],
      };
      
      const action = productsActions.loadProductsSuccess({ products });
      const state = reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('createProductSuccess action', () => {
    it('should add the new product to the products array', () => {
      const products: Product[] = [
        { id: 1, name: 'Product #1', company: "Test Company", price: 1 },
        { id: 2, name: 'Product #2', company: "Test Company", price: 1 },
      ];
      const product: Product = { id: 3, name: 'Product #3', company: "Test Company", price: 1 };
      
      const entities = {
        1: products[0],
        2: products[1],
      };
      
      const previousState = { ...initialState, entities };
      const action = productsActions.createProductSuccess({ product });
      const state = reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({ ...entities, 3: product });
    });
  });

  describe('removeProductSuccess action', () => {
    it('should remove the product', () => {
      const products: Product[] = [
        { id: 1, name: 'Product #1', company: "Test Company", price: 1 },
        { id: 2, name: 'Product #2', company: "Test Company", price: 1 },
      ];
      const entities = {
        1: products[0],
        2: products[1],
      };

      const previousState = { ...initialState, entities };
      const action = productsActions.removeProductSuccess({ product: products[0] });
      const state = reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities).toEqual({ 2: products[1] });
    });
  });
});
