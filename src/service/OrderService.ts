import type { CreateOrderRequest, Order, OrderItemRequest, UpdateOrderRequest } from '../model/order/order';
import type { ItemCarrinho } from '../contexts/CarrinhoContext';
import api from './AxiosConfig';

export const createOrder = async (order: CreateOrderRequest, token: string): Promise<Order> => {
  const response = await api.post("/order", order, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  return response.data;
};

export const createOrderFromCart = async (
  clientId: number,
  restaurantId: string,
  cartItems: ItemCarrinho[],
  token: string,
  observations?: string
): Promise<Order> => {
  const items: OrderItemRequest[] = cartItems.map((item) => ({
    productId: item.product.id ?? 0,
    quantity: item.quantity,
    observations: observations || "",
  }));

  const orderRequest: CreateOrderRequest = {
    clientId,
    restaurantId,
    items,
  };

  return createOrder(orderRequest, token);
};

export const getOrderById = async (id: number, token: string): Promise<Order> => {
  const response = await api.get(`/order/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  return response.data;
};

export const getOrdersByClient = async (clientId: number, token: string): Promise<Order[]> => {
  const response = await api.get(`/order/user/${clientId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  return response.data;
};

export const getOrdersByRestaurant = async (restaurantId: number, token: string): Promise<Order[]> => {
  const response = await api.get(`/order/restaurant/${restaurantId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  return response.data;
};

export const getOrdersByStatus = async (status: string, token: string): Promise<Order[]> => {
  const response = await api.get(`/order/status/${status}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  return response.data;
};

export const getOrderByRestaurantIdAndStatus = async (restaurantId: number, status: string, token: string): Promise<Order[]> => {
  const response = await api.get(`/order/restaurant/${restaurantId}/status/${status}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  return response.data;
};

export const updateOrder = async (
  id: number,
  payload: UpdateOrderRequest,
  token: string
): Promise<Order> => {
  const response = await api.put(`/order/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  return response.data;
};

export const cancelOrder = async (id: number, payload: UpdateOrderRequest, token: string): Promise<Order> => {
  const response = await api.put(`/order/cancel/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
  });
  return response.data;
};
