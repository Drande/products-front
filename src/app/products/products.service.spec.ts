import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import productsUrls from './constants/products.urls';
import { Product } from './models/product';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductsService;
  let controller: HttpTestingController;

  const product1: Product = { id: 1, name: 'Product #1', company: "Unit Test Company", price: 1 };
  const product2: Product = { id: 2, name: 'Product #2', company: "Unit Test Company", price: 1 };
  const product3: Product = { id: 3, name: 'Product #3', company: "Unit Test Company", price: 1 };

  const products: Product[] = [product1, product2, product3];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductsService
      ]
    });
    service = TestBed.inject(ProductsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a single product by id', () => {
    let emmitedValue: Product | undefined;
    service.getProduct(product1.id).subscribe(result => {
      emmitedValue = result;
    });
    
    const req = controller.expectOne(productsUrls.getById(product1.id));

    expect(req.request.method).toBe("GET");
    req.flush(product1);
    expect(emmitedValue).toEqual(product1);
  });

  it('should get list of products', () => {
    let emmitedValue: Product[] = [];
    service.getProducts().subscribe(result => {
      emmitedValue = result;
    });
    
    const req = controller.expectOne(productsUrls.getAll);

    expect(req.request.method).toBe("GET");
    req.flush(products);
    expect(emmitedValue).toEqual(products);
    expect(emmitedValue.length).toBeGreaterThan(0);
  });

  it('should create a product', () => {
    let emmitedValue: Product | undefined;
    service.createProduct(product2).subscribe(result => {
      emmitedValue = result;
    });
    
    const req = controller.expectOne(productsUrls.create);

    expect(req.request.method).toBe("POST");
    req.flush(product2);
    expect(emmitedValue).toEqual(product2);
  });

  it('should update a product', () => {
    let emmitedValue: boolean = false;
    service.updateProduct(product3.id, product3).subscribe(result => {
      emmitedValue = result;
    });
    
    const req = controller.expectOne(productsUrls.update(product3.id));

    expect(req.request.method).toBe("PUT");
    req.flush({}, { status: HttpStatusCode.Ok, statusText: "ok" });
    expect(emmitedValue).toBeTrue();
  });
  
  it('should delete a product', () => {
    let emmitedValue: boolean = false;
    service.deleteProduct(product3.id).subscribe(result => {
      emmitedValue = result;
    });
    
    const req = controller.expectOne(productsUrls.delete(product3.id));

    expect(req.request.method).toBe("DELETE");
    req.flush({}, { status: HttpStatusCode.Ok, statusText: "ok" });
    expect(emmitedValue).toBeTrue();
  });

  afterEach(() => {
    controller.verify();
  });
});
