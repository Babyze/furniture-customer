import { API_ROUTES } from '@src/constants/api-routes.constant';
import { ALL_CATEGORY_DEFAULT } from '@src/constants/category.constant';
import { Pagination } from '@src/models/pagination.model';
import { GetProductsQuery, Product, ProductSpu } from '@src/models/product.model';
import { api } from './axios';

class ProductService {
  private static instance: ProductService;

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getProducts(query: GetProductsQuery): Promise<Pagination<Product>> {
    if (query.categoryId === ALL_CATEGORY_DEFAULT.id) {
      query.categoryId = undefined;
    }

    return api.public.get<Pagination<Product>>(API_ROUTES.PRODUCT.LIST, {
      params: query,
    });
  }

  async getProductById(id: number): Promise<Product> {
    return api.public.get<Product>(API_ROUTES.PRODUCT.GET_BY_ID(id));
  }

  async getProductSpus(id: number): Promise<ProductSpu[]> {
    return api.public.get<ProductSpu[]>(API_ROUTES.PRODUCT.GET_SPUS(id));
  }
}

export const productService = ProductService.getInstance();
