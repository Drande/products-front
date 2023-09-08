import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductsService } from './products.service';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { StoreModule } from '@ngrx/store';
import { productsFeatureName, reducers } from './store/reducers';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    StoreModule.forFeature(productsFeatureName, reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    ProductsService,
  ]
})
export class ProductsModule { }
