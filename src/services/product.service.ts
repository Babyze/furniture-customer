import { API_ROUTES } from '@src/constants/api-routes.constant';
import { api } from './axios';
import { Product } from '@src/models/product.model';
import { Pagination } from '@src/models/pagination.model';

class ProductService {
  private static instance: ProductService;

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getProducts(): Promise<Pagination<Product>> {
    return api.public.get<Pagination<Product>>(API_ROUTES.PRODUCT.LIST);
  }
}

export const productService = ProductService.getInstance();
