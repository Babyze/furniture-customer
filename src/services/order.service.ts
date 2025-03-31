import { API_ROUTES } from '@src/constants/api-routes.constant';
import { OrderForm } from '@src/models/order.model';
import { api } from './axios';

interface PlaceOrderRequest {
  information: OrderForm;
  items: {
    productId: number;
    spuId: number;
    skuId: number;
    quantity: number;
  }[];
}

class OrderService {
  private static instance: OrderService;

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  async placeOrder(request: PlaceOrderRequest): Promise<void> {
    await api.post(API_ROUTES.ORDER.PLACE_ORDER, request);
  }
}

export const orderService = OrderService.getInstance();
