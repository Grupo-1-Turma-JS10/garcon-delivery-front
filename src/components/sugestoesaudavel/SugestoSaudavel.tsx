import { useState, useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import type { Produto } from '../../model/produto/produto';
import { getHealthyProducts } from '../../service/ProdutoService';
import { HEALTHY_CATEGORIES } from '../../constants/constants';

interface SugestoSaudavelProps {
  restaurantId: number;
  onAddProduct?: (product: Produto) => void;
}

export function SugestoSaudavel({ restaurantId, onAddProduct }: SugestoSaudavelProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    carregarProdutosSaudaveis();
  }, [restaurantId]);

  const carregarProdutosSaudaveis = async () => {
    setLoading(true);
    try {
      const todosProdutos: Produto[] = [];
      
      // Buscar produtos de cada categoria saudável
      for (const category of HEALTHY_CATEGORIES) {
        const produtos = await getHealthyProducts(restaurantId, category);
        todosProdutos.push(...produtos);
      }
      
      // Pegar até 3 produtos aleatórios
      const produtosAleatorios = todosProdutos
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      setProdutos(produtosAleatorios);
    } catch (error) {
      console.error('Erro ao carregar produtos saudáveis:', error);
    } finally {
      setLoading(false);
    }
  };

  if (closed || produtos.length === 0 || loading) {
    return null;
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-green-900">Dica Saudável</h3>
        </div>
        <button
          onClick={() => setClosed(true)}
          className="text-green-600 hover:text-green-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm text-green-800 mb-4">
        Que tal adicionar algo mais saudável ao seu pedido? Confira nossas opções:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-lg p-3 border border-green-100 hover:border-green-300 transition-all"
          >
            {produto.imageUrl && (
              <img
                src={produto.imageUrl}
                alt={produto.name}
                className="w-full h-24 object-cover rounded mb-2"
              />
            )}
            <h4 className="font-semibold text-sm text-gray-900 mb-1 truncate">
              {produto.name}
            </h4>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              {produto.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-green-600">
                R$ {Number(produto.price).toFixed(2)}
              </span>
              {onAddProduct && (
                <button
                  onClick={() => onAddProduct(produto)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition cursor-pointer"
                >
                  Adicionar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
