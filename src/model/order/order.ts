import type { Produto } from "../produto/produto";
import type { Usuario } from "../usuario/usuario";

export interface OrderItem {
  productId?: number;
  product?: Produto;
  quantity: number;
  price: number;
  observations?: string;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
  observations?: string;
}

export interface CreateOrderRequest {
  clientId: number;
  restaurantId: string;
  items: OrderItemRequest[];
}

export interface UpdateOrderRequest {
  items: OrderItemRequest[];
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
