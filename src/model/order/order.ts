import type { CartItem } from "../carrinho/carrinho";

export interface Order {
  id: string;
  products: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  customerName: string;
  createdAt: Date;
  restaurantId: string;
}