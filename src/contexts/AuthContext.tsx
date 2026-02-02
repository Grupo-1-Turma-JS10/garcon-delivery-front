import { createContext, useState, type ReactNode } from "react";
import type { LoginInput, LoginResponse } from "../model/usuario/usuario";
import { login } from "../service/UsuarioService";
import { ToastAlerta } from "../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  usuario: LoginResponse;
  handleLogout(): void;
  handleLogin(dados: LoginInput): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<LoginResponse>({
    token: "",
    email: "",
    username: "",
    role: "",
    id: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      token: "",
      email: "",
      username: "",
      role: "",
      id: 0
    });

    ToastAlerta("Usuário deslogado com sucesso!", "sucesso");
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

