import { PaginationRequestQuery } from './pagination.model';

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  minPrice: number;
  maxPrice: number;
  stock: number;
  categoryId: number;
  categoryAreaId: number;
}

export interface GetProductsQuery extends PaginationRequestQuery {
  categoryId?: number;
}
