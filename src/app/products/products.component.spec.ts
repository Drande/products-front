import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { rootReducers } from '../store';
import { ProductsFeatureState, reducers } from './store/reducers';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { productsActions } from './store/actions/products.action';
import { Product } from './models/product';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: Store<ProductsFeatureState>;

  const product1: Product = { id: 1, name: 'Product #1', company: "Test Company", price: 1 };
  const product2: Product = { id: 2, name: 'Product #2', company: "Test Company", price: 1 };
  const product3: Product = { id: 3, name: 'Product #3', company: "Test Company", price: 1 };

  const products: Product[] = [product1, product2, product3];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        NoopAnimationsModule,
        StoreModule.forRoot({
          ...rootReducers,
          products: combineReducers(reducers),
        }),
      ],
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store<ProductsFeatureState>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render a list of products', () => {
    store.dispatch(productsActions.loadProductsSuccess({ products }));
    const elements = fixture.debugElement.queryAll(ele => Object.keys(ele.attributes).includes("mat-row"))
    expect(elements.length).toBeGreaterThan(0);
  });
});
