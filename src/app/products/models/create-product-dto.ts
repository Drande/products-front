import { Product } from "./product";

export interface CreateProductDto extends Omit<Product, "id"> {
    
}