import axios from "axios";



const api = axios.create({
    baseURL: "http://localhost:4000",
});



export type UserRole = "client" | "restaurant" | "admin";

export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    document?: string;
    address?: string;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UsuarioResponse {
    data: User;
}



export const createUser = async (
    user: User
): Promise<User> => {
    const response = await api.post("/users", user);
    return response.data;
};


export const getAllUsuarios = async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data;
};


export const getUsuarioById = async (
    id: number
): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};


export const getUsuarioByEmail = async (
    email: string
): Promise<User | null> => {
    const response = await api.get("/users", {
        params: { email },
    });
    return response.data;
};


export const updateUsuario = async (
    id: number,
    usuario: Partial<User>
): Promise<User> => {
    const response = await api.put(`/users/${id}`, usuario);
    return response.data;
};


export const deleteUsuario = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
};
