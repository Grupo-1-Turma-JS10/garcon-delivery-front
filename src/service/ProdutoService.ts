import type { Produto, ProdutoInput } from "../model/produto/produto";
import api from "./AxiosConfig";

export const getProdutos = async (): Promise<Produto[]> => {
    const response = await api.get("/product", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        }
    }
    );
    return response.data;
}

export const getProdutoById = async (id: number): Promise<Produto> => {
    const response = await api.get(`/product/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        }
    }
    );
    return response.data;
}

export const findByRestaurantId = async (restaurantId: number): Promise<Produto[]> => {
    const response = await api.get(`/product/restaurant/${restaurantId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        }
    }
    );
    return response.data;
}

export const createProduto = async (produto: ProdutoInput): Promise<Produto> => {
    const response = await api.post("/product", produto, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        }
    }
    );
    return response.data;
}

export const updateProduto = async (id: number, produto: ProdutoInput): Promise<Produto> => {
    const response = await api.put(`/product/${id}`, produto, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        }
    }
    );
    return response.data;
}

export const deleteProduto = async (id: number): Promise<void> => {
    const response = await api.delete(`/product/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        }
    }
    );
    return response.data;
}