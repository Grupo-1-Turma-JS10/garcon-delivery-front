import type { Produto, ProdutoInput } from "../model/produto/produto";
import api from "./AxiosConfig";

// GET - Rotas públicas (sem autenticação)
export const getProdutos = async (): Promise<Produto[]> => {
    const response = await api.get("/product");
    return response.data;
}

export const getProdutoById = async (id: number): Promise<Produto> => {
    const response = await api.get(`/product/${id}`);
    return response.data;
}

export const findByRestaurantId = async (restaurantId: number): Promise<Produto[]> => {
    const response = await api.get(`/product/restaurant/${restaurantId}`);
    return response.data;
}

export const findByCategory = async (category: string): Promise<Produto[]> => {
    const response = await api.get(`/product/category/${category}`);
    return response.data;
}

// POST, PUT, DELETE - Rotas protegidas (com autenticação)
export const createProduto = async (produto: ProdutoInput, token: string): Promise<Produto> => {
    const response = await api.post("/product", produto, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    );
    return response.data;
}

export const updateProduto = async (id: number, produto: ProdutoInput, token: string): Promise<Produto> => {
    const response = await api.put(`/product/${id}`, produto, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    );
    return response.data;
}

export const deleteProduto = async (id: number, token: string): Promise<void> => {
    const response = await api.delete(`/product/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    );
    return response.data;
}