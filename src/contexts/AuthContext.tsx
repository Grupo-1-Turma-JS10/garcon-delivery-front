import { createContext, useState, type ReactNode } from "react";
import type { LoginInput, LoginResponse } from "../model/usuario/usuario";
import { login } from "../service/UsuarioService";
import { ToastAlerta } from "../utils/ToastAlerta";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  usuario: LoginResponse;
  handleLogout(): void;
  handleLogin(dados: LoginInput): Promise<void>;
  updateUsuario(usuarioAtualizado: Partial<LoginResponse>): void;
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
    name: "",
    role: "",
    id: 0,
    active: false,
    address: "",
    document: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(dados: LoginInput) {
    setIsLoading(true);

    try {
      const usuarioLogado = await login(dados);
      
      // Verificar se a conta está ativa
      if (!usuarioLogado.active) {
        ToastAlerta("Sua conta foi desativada. Por favor, cadastre-se novamente.", "erro");
        setIsLoading(false);
        return;
      }
      
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
      name: "",
      role: "",
      id: 0,
      active: false,
      address: "",
      document: ""
    });

    ToastAlerta("Usuário deslogado com sucesso!", "sucesso");
    navigate("/");
  }

  function updateUsuario(usuarioAtualizado: Partial<LoginResponse>) {
    setUsuario(prev => ({ ...prev, ...usuarioAtualizado }));
  }

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, updateUsuario, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

