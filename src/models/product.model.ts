import { PaginationRequestQuery } from './pagination.model';

export interface ProductSpu {
  id: number;
  skuId: number;
  name: string;
  price: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  measurements: string;
  imageUrl: string;
  categoryName: string;
  categoryAreaName: string;
  minPrice: number;
  maxPrice: number;
  stock: number;
  categoryId: number;
  categoryAreaId: number;
}

export interface GetProductsQuery extends PaginationRequestQuery {
  categoryId?: number;
}
