import { Plus } from 'lucide-react';
import type { Produto } from '../../model/produto/produto';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ROLE } from '../../constants/constants';

interface ProductCardProps {
  product: Produto;
  onAddToCart: (product: Produto) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="aspect-video w-full overflow-hidden bg-gray-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            R$ {Number(product.price).toFixed(2)}
          </span>

          {usuario.role !== ROLE.RESTAURANT &&
            <button
              onClick={() => onAddToCart(product)}
              className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          }
        </div>
      </div>
    </div>
  );
}