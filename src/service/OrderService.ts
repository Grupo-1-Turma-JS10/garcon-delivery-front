import type { CreateOrderRequest, Order, OrderItem } from '../model/order/order';
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
  restaurantId: number,
  cartItems: ItemCarrinho[],
  token: string,
  observations?: string
): Promise<Order> => {
  const items: OrderItem[] = cartItems.map((item) => ({
    productId: item.id ?? 0,
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

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await api.get(`/order/${id}`);
  return response.data;
};

export const getOrdersByClient = async (clientId: number): Promise<Order[]> => {
  const response = await api.get(`/order/client/${clientId}`);
  return response.data;
};

export const getOrdersByRestaurant = async (restaurantId: number): Promise<Order[]> => {
  const response = await api.get(`/order/restaurant/${restaurantId}`);
  return response.data;
};

export const getOrdersByStatus = async (
  status: string
): Promise<Order[]> => {
  const response = await api.get(`/order/status/${status}`);
  return response.data;
};

export const updateOrder = async (
  id: number,
  payload: Partial<Order>
): Promise<Order> => {
  const response = await api.put(`/order/${id}`, payload);
  return response.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await api.delete(`/order/${id}`);
};
