export type UserType = 'CLIENT' | 'RESTAURANT';

export interface Usuario {
  id: string;
  name: string;
  document: string;
  email: string;
  password: string;
  role: UserType;
  address: string;
}

export interface CadastroInput {
  name: string;
  document: string;
  email: string;
  password: string;
  role: UserType;
  address: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
