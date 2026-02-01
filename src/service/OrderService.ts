import api from './AxiosConfig';

export type OrderStatus = "CREATED";

export interface OrderItem {
  productId: number;
  quantity: number;
  observations?: string;
}

export interface Order {
  id?: number;
  clientId: number;
  restaurantId: number;
  items: OrderItem[];
  total?: number;
  status?: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
}

export const createOrder = async (order: Order): Promise<Order> => {
  const payload = {
    clientId: order.clientId,
    restaurantId: order.restaurantId,
    items: order.items,
  };

  const response = await api.post("/orders", payload);
  return response.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getOrdersByClient = async (
  clientId: number
): Promise<Order[]> => {
  const response = await api.get(`/orders/client/${clientId}`);
  return response.data;
};

export const getOrdersByRestaurant = async (
  restaurantId: number
): Promise<Order[]> => {
  const response = await api.get(`/orders/restaurant/${restaurantId}`);
  return response.data;
};

export const getOrdersByStatus = async (
  status: OrderStatus
): Promise<Order[]> => {
  const response = await api.get(`/orders/status/${status}`);
  return response.data;
};

export const updateOrder = async (
  id: number,
  payload: Partial<Order>
): Promise<Order> => {
  const response = await api.put(`/orders/${id}`, payload);
  return response.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await api.delete(`/orders/${id}`);
};
