import { Action, createAction, createActionGroup, props } from '@ngrx/store';
import { Product } from '../../models/product';
import { CreateProductDto } from '../../models/create-product-dto';
import { UpdateProductDto } from '../../models/update-product-dto';

export const productsActions = createActionGroup({
  source: 'Products',
  events: {
    loadProducts: props<any>(),
    loadProductsFail: props<{ error: any }>(),
    loadProductsSuccess: props<{ products: Product[] }>(),
    createProduct: props<{ product: CreateProductDto }>(),
    createProductFail: props<{ error: any }>(),
    createProductSuccess: props<{ product: Product }>(),
    updateProduct: props<{ product: UpdateProductDto }>(),
    updateProductFail: props<{ error: any }>(),
    updateProductSuccess: props<{ product: Product }>(),
    removeProduct: props<{ product: Product }>(),
    removeProductFail: props<{ error: any }>(),
    removeProductSuccess: props<{ product: Product }>(),
  },
});
