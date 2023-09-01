import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable()
export class ProductsService {
  private resourceUrl: string = "http://localhost:3000/api/products";
  constructor(
    private readonly httpClient: HttpClient,
  ) {

  }

  getProduct(id: string | number): Observable<Product> {
    const requestUrl = `${this.resourceUrl}/${id}`;
    return this.httpClient.get<Product>(requestUrl);
  }

  getProducts(): Observable<Product[]> {
    const requestUrl = this.resourceUrl;
    return this.httpClient.get<Product[]>(requestUrl);
  }

  createProduct(product: Product): Observable<Product> {
    const requestUrl = this.resourceUrl;
    const body = product;
    return this.httpClient.post<Product>(requestUrl, body);
  }

  updateProduct(id: string | number, product: Product): Observable<Product> {
    const requestUrl = `${this.resourceUrl}/${id}`;
    const body = product;
    return this.httpClient.put<Product>(requestUrl, body);
  }

  deleteProduct(id: string | number): Observable<void> {
    const requestUrl = `${this.resourceUrl}/${id}`;
    return this.httpClient.delete<void>(requestUrl);
  }
}
