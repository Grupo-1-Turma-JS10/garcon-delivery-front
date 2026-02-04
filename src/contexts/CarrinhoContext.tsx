import { createContext, useState, type ReactNode, useCallback, useContext } from "react";
import type { Produto } from "../model/produto/produto";
import { createOrderFromCart } from "../service/OrderService";
import { ToastAlerta } from "../utils/ToastAlerta";
import { AuthContext } from "./AuthContext";

export interface ItemCarrinho {
  product: Produto;
  quantity: number;
}

interface CarrinhoContextProps {
  itens: ItemCarrinho[];
  restaurantId: string | null;
  adicionarProduto(produto: Produto, restaurantId: string): void;
  removerProduto(produtoId: number): void;
  atualizarQuantidade(produtoId: number, quantidade: number): void;
  limparCarrinho(): void;
  finalizarCompra(clientId: number, observations?: string): Promise<void>;
  totalItens: number;
  totalValor: number;
  isLoading: boolean;
}

interface CarrinhoProviderProps {
  children: ReactNode;
}

export const CarrinhoContext = createContext({} as CarrinhoContextProps);

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const { usuario } = useContext(AuthContext);

  const adicionarProduto = useCallback((produto: Produto, newRestaurantId: string) => {
    if (restaurantId && String(restaurantId) !== newRestaurantId) {
      ToastAlerta("Você só pode adicionar produtos de um restaurante por vez", "info");
      return;
    }

    setRestaurantId(newRestaurantId);
    setItens((prevItens) => {
      const itemExistente = prevItens.find((item) => item.product.id === produto.id);

      if (itemExistente) {
        // Se o produto já existe, aumenta a quantidade
        return prevItens.map((item) =>
          item.product.id === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Adiciona novo produto com quantidade 1
        return [...prevItens, { product: produto, quantity: 1 }];
      }
    });
  }, [restaurantId]);

  const removerProduto = useCallback((produtoId: number) => {
    setItens((prevItens) =>
      prevItens.filter((item) => item.product.id !== produtoId)
    );
  }, []);

  const atualizarQuantidade = useCallback(
    (produtoId: number, quantidade: number) => {
      if (quantidade <= 0) {
        removerProduto(produtoId);
      } else {
        setItens((prevItens) =>
          prevItens.map((item) =>
            item.product.id === produtoId ? { ...item, quantity: quantidade } : item
          )
        );
      }
    },
    [removerProduto]
  );

  const limparCarrinho = useCallback(() => {
    setItens([]);
    setRestaurantId(null);
  }, []);

  const finalizarCompra = useCallback(
    async (clientId: number, observations?: string) => {
      if (itens.length === 0) {
        ToastAlerta("Carrinho vazio!", "info");
        return;
      }

      if (!restaurantId) {
        ToastAlerta("Restaurante não selecionado!", "erro");
        return;
      }

      setIsLoading(true);
      try {
        await createOrderFromCart(clientId, restaurantId, itens, usuario.token, observations);
        ToastAlerta("Pedido criado com sucesso!", "sucesso");
        limparCarrinho();
      } catch (error) {
        console.error("Erro ao criar pedido:", error);
        ToastAlerta("Erro ao criar pedido", "erro");
      } finally {
        setIsLoading(false);
      }
    },
    [itens, restaurantId, limparCarrinho, usuario.token]
  );

  const totalItens = itens.reduce((total, item) => total + item.quantity, 0);
  const totalValor = itens.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        restaurantId,
        adicionarProduto,
        removerProduto,
        atualizarQuantidade,
        limparCarrinho,
        finalizarCompra,
        totalItens,
        totalValor,
        isLoading,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}