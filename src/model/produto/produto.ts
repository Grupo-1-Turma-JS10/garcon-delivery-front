import type { Restaurant } from "../restaurant/restaurant";

export interface Produto {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  restaurant: Restaurant;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProdutoInput {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  restaurantId?: number;
  available: boolean;
}