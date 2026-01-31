import api from './AxiosConfig';

export interface Usuario {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role: 'client' | 'restaurant' | 'admin';
    document?: string;
    address?: string;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UsuarioResponse {
    data: Usuario;
    message?: string;
}

export interface UsuariosListResponse {
    data: Usuario[];
    total?: number;
    page?: number;
    limit?: number;
}

class UsuarioService {

    async createUsuario(usuario: Usuario): Promise<UsuarioResponse> {
        try {
            const response = await api.post('/users', usuario);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }


    async getAllUsuarios(page: number = 1, limit: number = 10): Promise<UsuariosListResponse> {
        try {
            const response = await api.get('/users', {
                params: { page, limit }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            throw error;
        }
    }


    async getUsuarioById(id: number): Promise<UsuarioResponse> {
        try {
            const response = await api.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter usuário:', error);
            throw error;
        }
    }


    async getUsuarioByEmail(email: string): Promise<UsuarioResponse> {
        try {
            const response = await api.get('/users', {
                params: { email }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter usuário por email:', error);
            throw error;
        }
    }


    async updateUsuario(id: number, usuario: Partial<Usuario>): Promise<UsuarioResponse> {
        try {
            const response = await api.put(`/users/${id}`, usuario);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }


    async deleteUsuario(id: number): Promise<UsuarioResponse> {
        try {
            const response = await api.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }


    async loginUsuario(email: string, password: string): Promise<UsuarioResponse> {
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }


    async signupUsuario(usuario: Usuario): Promise<UsuarioResponse> {
        try {
            const response = await api.post('/auth/signup', usuario);
            return response.data;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    }


    async updateProfile(usuario: Partial<Usuario>): Promise<UsuarioResponse> {
        try {
            const response = await api.put('/users/profile', usuario);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            throw error;
        }
    }


    async changePassword(oldPassword: string, newPassword: string): Promise<UsuarioResponse> {
        try {
            const response = await api.post('/users/change-password', {
                oldPassword,
                newPassword
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            throw error;
        }
    }


    async getUsuariosByRole(role: 'client' | 'restaurant' | 'admin'): Promise<UsuariosListResponse> {
        try {
            const response = await api.get('/users/role', {
                params: { role }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter usuários por role:', error);
            throw error;
        }
    }


    async searchUsuarios(searchTerm: string): Promise<UsuariosListResponse> {
        try {
            const response = await api.get('/users/search', {
                params: { q: searchTerm }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            throw error;
        }
    }
}

export default new UsuarioService();
