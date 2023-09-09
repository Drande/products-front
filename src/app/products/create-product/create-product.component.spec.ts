import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, combineReducers } from '@ngrx/store';
import { rootReducers } from 'src/app/store';
import { reducers } from '../store/reducers';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let dialogRef: any;

  beforeEach(() => {
    dialogRef = { close: (_data?: any) => {} };
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        StoreModule.forRoot({
          ...rootReducers,
          products: combineReducers(reducers),
        }),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRef }
      ]
    });
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(dialogRef, 'close');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close if cancel button is clicked', () => {
    const cancelButton = fixture.debugElement.query(elem => elem.nativeElement.innerHTML == "Cancelar").parent;
    cancelButton?.triggerEventHandler("click");

    expect(cancelButton).toBeTruthy();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });
});
