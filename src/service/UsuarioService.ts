import type { CadastroInput, LoginInput, Usuario } from "../model/usuario/usuario";
import api from "./AxiosConfig";

export const createUser = async (user: CadastroInput): Promise<Usuario> => {
    const response = await api.post("/user/register", user);
    return response.data;
};

export const login = async (loginData: LoginInput): Promise<Usuario> => {
    const response = await api.post("/auth/login", loginData);
    return response.data;
}

export const getUsuarioById = async (id: number): Promise<Usuario> => {
    const response = await api.get(`/user/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        }
    });
    return response.data;
};

export const getUsuarioByEmail = async (email: string): Promise<Usuario> => {
    const response = await api.get("/user", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        },
        params: { email },
    });
    return response.data;
};

export const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
    const response = await api.put(`/user/${id}`, usuario, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        }
    });
    return response.data;
};

export const deleteUsuario = async (id: number): Promise<void> => {
    await api.delete(`/user/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer token_example`
        }
    });
};
