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
