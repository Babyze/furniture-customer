import { API_ROUTES } from '@src/constants/api-routes.constant';
import { GetOrdersQuery, Order, OrderForm } from '@src/models/order.model';
import { Pagination } from '@src/models/pagination.model';
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

  async getOrders(query: GetOrdersQuery): Promise<Pagination<Order>> {
    return api.get<Pagination<Order>>(API_ROUTES.ORDER.GET_ORDERS, {
      params: query,
    });
  }
}

export const orderService = OrderService.getInstance();
