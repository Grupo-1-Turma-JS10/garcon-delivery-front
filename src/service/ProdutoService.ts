import axios from 'axios';
import type { Product } from '../model/types';

// Backend endpoint ajustado para rota singular `/product`
const API_URL = 'http://localhost:3000/product';

interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  available: boolean;
  restaurantId: number;
  category?: string;
  image?: string;
}

interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  available?: boolean;
  category?: string;
  image?: string;
}

export class ProdutoService {
  static async findAll(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(API_URL);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar produtos');
    }
  }

  static async findById(id: number): Promise<Product> {
    try {
      const response = await axios.get<Product>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Produto não encontrado');
    }
  }

  static async findByRestaurantId(restaurantId: number): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(
        `${API_URL}/restaurant/${restaurantId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar produtos do restaurante');
    }
  }

  static async findByName(name: string): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/search`, {
        params: { name }
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar produtos');
    }
  }

  static async findAvailable(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${API_URL}/available`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar produtos disponíveis');
    }
  }

  static async create(dto: CreateProductDto): Promise<Product> {
    try {
      const response = await axios.post<Product>(API_URL, dto);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao criar produto'
      );
    }
  }

  static async update(id: number, dto: UpdateProductDto): Promise<Product> {
    try {
      const response = await axios.patch<Product>(`${API_URL}/${id}`, dto);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao atualizar produto'
      );
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao deletar produto'
      );
    }
  }
}
