import axios from 'axios';
import type { Product } from '../model/types';

const api = axios.create({
  baseURL: `http://localhost:4000`
});

class ProdutoServiceClass {
  async findByRestaurantId(restaurantId: number): Promise<Product[]> {
    try {
      const response = await api.get('/products', { params: { restaurantId } });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  async create(payload: Partial<Product>): Promise<Product> {
    try {
      const response = await api.post('/products', payload);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }

  async update(id: number, payload: Partial<Product>): Promise<Product> {
    try {
      const response = await api.put(`/products/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  }
}

export const ProdutoService = new ProdutoServiceClass();
export default ProdutoService;
