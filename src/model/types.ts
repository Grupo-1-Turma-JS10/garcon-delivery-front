export type UserType = 'client' | 'restaurant';

export interface User {
  id: string;
  name: string;
  document: string;
  email: string;
  password: string;
  role: UserType;
  address: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  restaurantId: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  products: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  customerName: string;
  createdAt: Date;
  restaurantId: string;
}