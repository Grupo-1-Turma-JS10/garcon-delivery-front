export interface Usuario {
  id: string;
  name: string;
  document: string;
  email: string;
  password: string;
  role: string;
  address: string;
  token: string;
  active: boolean;
}

export interface CadastroInput {
  name: string;
  document: string;
  email: string;
  password: string;
  role: string;
  address: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  token: string;
  email: string;
  name: string;
  role: string;
  active?: boolean;
  address: string;
  document: string;
}

export interface UsuarioUpdate {
  name: string;
  document: string;
  email: string;
  password: string;
  address: string;
}