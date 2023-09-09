import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import { rootReducers } from '../store';
import { reducers } from './store/reducers';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
