import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from '../../components/produto/CardProduto';
import { getProdutos } from '../../service/ProdutoService';
import type { Produto } from '../../model/produto/produto';

export function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        buscarProdutos();
    }, []);

    const buscarProdutos = async () => {
        try {
            const produtos = await getProdutos();
            setProdutos(produtos);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    }

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(produtos.map(p => p.category)));
        return ['all', ...uniqueCategories];
    }, [produtos]);

    const filteredProducts = useMemo(() => {
        return produtos.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [produtos, searchTerm, selectedCategory]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-h-[69.2vh]">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Nosso Cardápio</h1>

                <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                        />
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition text-sm ${selectedCategory === category
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category === 'all' ? 'Todos' : category}
                        </button>
                    ))}
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-sm sm:text-base">Nenhum produto encontrado</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={() => alert(`Adicionado ${product.name} ao carrinho`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}