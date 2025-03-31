export interface OrderForm {
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface OrderItem {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  image: string;
  quantity: number;
}
