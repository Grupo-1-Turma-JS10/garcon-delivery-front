import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from '../../components/produto/CardProduto';

export function ListaProdutos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const products = [
        { id: 1, name: 'Pizza Margherita', description: 'Deliciosa pizza com molho de tomate, mussarela e manjericão.', category: 'Pizzas', price: 35.90, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', restaurantId: 1 },
        { id: 2, name: 'Hambúrguer Clássico', description: 'Hambúrguer com carne bovina, queijo, alface, tomate e maionese.', category: 'Lanches', price: 28.50, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', restaurantId: 1 },
        { id: 3, name: 'Salada Caesar', description: 'Salada com alface, croutons, parmesão e molho Caesar.', category: 'Saladas', price: 22.00, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', restaurantId: 1 },
        { id: 4, name: 'Sushi Mix', description: 'Variedade de sushis frescos com peixe e legumes.', category: 'Comida Japonesa', price: 45.00, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', restaurantId: 1 },
        { id: 5, name: 'Espaguete à Bolonhesa', description: 'Massa com molho de carne moída e tomate.', category: 'Massas', price: 32.00, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', restaurantId: 1 },
        { id: 6, name: 'Açaí', description: 'Açaí com granola e frutas.', category: 'Sobremesas', price: 25.50, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400', restaurantId: 1 },
    ];
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
        return ['all', ...uniqueCategories];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
                            onAddToCart={() => alert(`Adicionado ${product.name} ao carrinho!`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}