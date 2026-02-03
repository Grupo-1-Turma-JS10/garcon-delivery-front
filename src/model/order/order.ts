import type { Usuario } from "../usuario/usuario";

export interface OrderItem {
  productId: number;
  quantity: number;
  observations?: string;
}

export interface CreateOrderRequest {
  clientId: number;
  restaurantId: number;
  items: OrderItem[];
}

export interface UpdateOrderRequest {
  items: OrderItem[];
  status: string;
}

export interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  status: string;
  client: Usuario;
  restaurant: Usuario;
  createdAt: string;
  updatedAt: string;
}
