import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './models/product';
import { CreateProductDto } from './models/create-product-dto';
import { UpdateProductDto } from './models/update-product-dto';
import productsUrls from './constants/products.urls';

@Injectable()
export class ProductsService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {

  }

  getProduct(id: string | number): Observable<Product> {
    const requestUrl = productsUrls.getById(id);
    return this.httpClient.get<Product>(requestUrl);
  }

  getProducts(): Observable<Product[]> {
    const requestUrl = productsUrls.getAll;
    return this.httpClient.get<Product[]>(requestUrl);
  }

  createProduct(product: CreateProductDto): Observable<Product> {
    const requestUrl = productsUrls.create;
    const body = product;
    return this.httpClient.post<Product>(requestUrl, body);
  }

  updateProduct(id: string | number, product: UpdateProductDto): Observable<boolean> {
    const requestUrl = productsUrls.update(id);
    const body = product;
    return this.httpClient.put<HttpResponse<void>>(requestUrl, body, { observe: 'response' }).pipe(map(response => response.ok));
  }

  deleteProduct(id: string | number): Observable<boolean> {
    const requestUrl = productsUrls.delete(id);
    return this.httpClient.delete<HttpResponse<void>>(requestUrl, { observe: 'response' }).pipe(map(response => response.ok));
  }
}
