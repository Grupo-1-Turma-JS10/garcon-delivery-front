import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:4000`
});

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';

export interface OrderItem {
    productId: string;
    name?: string;
    price: number;
    quantity: number;
    observations?: string;
}

export interface Order {
    id?: string;
    userId: string;
    restaurantId?: string;
    items: OrderItem[];
    total: number;
    status?: OrderStatus;
    address?: string;
    paymentMethod?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderResponse {
    data: Order;
    message?: string;
}

export interface OrdersListResponse {
    data: Order[];
    total?: number;
    page?: number;
    limit?: number;
}

class OrderService {

    async createOrder(order: Order): Promise<OrderResponse> {
        try {
            const payload = {
                clientId: order.userId,
                restaurantId: order.restaurantId,
                items: order.items,
            };
            const response = await api.post('/orders', payload);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw error;
        }
    }


    async getAllOrders(page: number = 1, limit: number = 20): Promise<OrdersListResponse> {
        try {
            const response = await api.get('/orders', { params: { page, limit } });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
            throw error;
        }
    }


    async getOrderById(id: string): Promise<OrderResponse> {
        try {
            const response = await api.get(`/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pedido:', error);
            throw error;
        }
    }

    async updateOrder(id: string, payload: Partial<Order>): Promise<OrderResponse> {
        try {
            const response = await api.put(`/orders/${id}`, payload);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            throw error;
        }
    }


    async deleteOrder(id: string): Promise<OrderResponse> {
        try {
            const response = await api.delete(`/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            throw error;
        }
    }


    async getOrdersByUser(userId: string, page: number = 1, limit: number = 20): Promise<OrdersListResponse> {
        try {
            const response = await api.get(`/orders/client/${userId}`, { params: { page, limit } });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pedidos por usuário:', error);
            throw error;
        }
    }

    async getOrdersByRestaurant(restaurantId: string, page: number = 1, limit: number = 20): Promise<OrdersListResponse> {
        try {
            const response = await api.get(`/orders/restaurant/${restaurantId}`, { params: { page, limit } });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pedidos por restaurante:', error);
            throw error;
        }
    }

    async getOrdersByStatus(status: string, page: number = 1, limit: number = 20): Promise<OrdersListResponse> {
        try {
            const response = await api.get(`/orders/status/${status}`, { params: { page, limit } });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pedidos por status:', error);
            throw error;
        }
    }


    async changeOrderStatus(id: string, status: OrderStatus): Promise<OrderResponse> {
        try {
            const response = await api.patch(`/orders/${id}/status`, { status });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar status do pedido:', error);
            throw error;
        }
    }


    async addItem(id: string, item: OrderItem): Promise<OrderResponse> {
        try {
            const response = await api.post(`/orders/${id}/items`, item);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar item ao pedido:', error);
            throw error;
        }
    }


    async removeItem(id: string, productId: string): Promise<OrderResponse> {
        try {
            const response = await api.delete(`/orders/${id}/items/${productId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao remover item do pedido:', error);
            throw error;
        }
    }

    async searchOrders(q: string, page: number = 1, limit: number = 20): Promise<OrdersListResponse> {
        try {
            const response = await api.get('/orders/search', { params: { q, page, limit } });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
            throw error;
        }
    }
}

export default new OrderService();
