import { createContext, useState, type ReactNode, useCallback } from "react";
import type { Produto } from "../model/produto/produto";

export interface ItemCarrinho extends Produto {
  quantity: number;
}

interface CarrinhoContextProps {
  itens: ItemCarrinho[];
  adicionarProduto(produto: Produto): void;
  removerProduto(produtoId: number): void;
  atualizarQuantidade(produtoId: number, quantidade: number): void;
  limparCarrinho(): void;
  totalItens: number;
  totalValor: number;
}

interface CarrinhoProviderProps {
  children: ReactNode;
}

export const CarrinhoContext = createContext({} as CarrinhoContextProps);

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarProduto = useCallback((produto: Produto) => {
    setItens((prevItens) => {
      const itemExistente = prevItens.find((item) => item.id === produto.id);

      if (itemExistente) {
        // Se o produto já existe, aumenta a quantidade
        return prevItens.map((item) =>
          item.id === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Adiciona novo produto com quantidade 1
        return [...prevItens, { ...produto, quantity: 1 }];
      }
    });
  }, []);

  const removerProduto = useCallback((produtoId: number) => {
    setItens((prevItens) =>
      prevItens.filter((item) => item.id !== produtoId)
    );
  }, []);

  const atualizarQuantidade = useCallback(
    (produtoId: number, quantidade: number) => {
      if (quantidade <= 0) {
        removerProduto(produtoId);
      } else {
        setItens((prevItens) =>
          prevItens.map((item) =>
            item.id === produtoId ? { ...item, quantity: quantidade } : item
          )
        );
      }
    },
    [removerProduto]
  );

  const limparCarrinho = useCallback(() => {
    setItens([]);
  }, []);

  const totalItens = itens.reduce((total, item) => total + item.quantity, 0);
  const totalValor = itens.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarProduto,
        removerProduto,
        atualizarQuantidade,
        limparCarrinho,
        totalItens,
        totalValor,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}