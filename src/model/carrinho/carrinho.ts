import type { Produto } from "../produto/produto";

export interface CartItem {
  product: Produto;
  quantity: number;
}