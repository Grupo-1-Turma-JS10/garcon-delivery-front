import { createContext, useState, type ReactNode } from "react";
import type { Usuario, LoginInput } from "../model/usuario/usuario";
import { login } from "../service/UsuarioService";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
  usuario: Usuario;
  handleLogout(): void;
  handleLogin(dados: LoginInput): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {

  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    name: "",
    document: "",
    email: "",
    password: "",
    role: "CLIENT",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(dados: LoginInput) {
    setIsLoading(true);

    try {
      const usuarioLogado = await login(dados);

      setUsuario(usuarioLogado);

      ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso");

    } catch (error) {
      ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro");
    }

    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({
      id: "",
      name: "",
      document: "",
      email: "",
      password: "",
      role: "CLIENT",
      address: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

