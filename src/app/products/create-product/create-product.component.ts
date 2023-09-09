import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../models/product';
import { ProductsFeatureState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { productsActions } from '../store/actions/products.action';
import { CreateProductDto } from '../models/create-product-dto';
import { UpdateProductDto } from '../models/update-product-dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class CreateProductComponent {
  actionName: string = "";
  currentProduct?: Product;

  productForm = new FormGroup({
    name: new FormControl<string>("", { validators: [Validators.required, Validators.maxLength(50)], nonNullable: true }),
    description: new FormControl<string>("", { validators: [Validators.maxLength(100)], nonNullable: false }),
    ageRestriction: new FormControl<number | null>(null, { validators: [Validators.min(0), Validators.max(100)], nonNullable: false }),
    company: new FormControl<string>("", { validators: [Validators.required, Validators.maxLength(50)], nonNullable: true }),
    price: new FormControl<number>(0, { validators: [Validators.required, Validators.min(1), Validators.max(1000)], nonNullable: true }),
  });

  productFormControls: typeof this.productForm.controls;

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly store: Store<ProductsFeatureState>,
  ) {
    this.currentProduct = data?.product;
    if(this.currentProduct) {
      this.actionName = "Update";
      this.productForm.patchValue({ ...this.currentProduct });  
    } else {
      this.actionName = "Create";
    }
    this.productFormControls = this.productForm.controls;
  }

  handleSubmit() {
    if(this.currentProduct) {
      const product: UpdateProductDto = {
        id: this.currentProduct.id,
        ...this.productForm.getRawValue()
      };
      this.store.dispatch(productsActions.updateProduct({ product }));
    } else {
      const product: CreateProductDto = {
        ...this.productForm.getRawValue()
      };
      this.store.dispatch(productsActions.createProduct({ product }));
    }
    this.dialogRef.close();
  }
  
  handleClose() {
    this.dialogRef.close();
  }
}
