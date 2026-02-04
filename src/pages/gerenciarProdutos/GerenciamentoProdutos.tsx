import { useState, useEffect, useContext } from 'react';
import { Edit2, Trash2, Plus, Search, X } from 'lucide-react';
import type { Produto, ProdutoInput } from '../../model/produto/produto';
import { createProduto, deleteProduto, findByRestaurantId, updateProduto } from '../../service/ProdutoService';
import { AuthContext } from '../../contexts/AuthContext';
import { CATEGORIES } from '../../constants/constants';



export function GerenciamentoProdutos() {
    const { usuario } = useContext(AuthContext);
    const restaurantId = usuario.id;

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState<ProdutoInput>({
        name: '',
        description: '',
        price: 0,
        available: true,
        imageUrl: '',
        category: '',
    });

    useEffect(() => {
        carregarProdutos();
    }, [restaurantId]);


    useEffect(() => {
        const filtered = produtos.filter(
            (p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProdutos(filtered);
    }, [searchTerm, produtos]);

    const carregarProdutos = async () => {
        setLoading(true);
        try {
            const data = await findByRestaurantId(restaurantId);
            setProdutos(data);
            setFilteredProdutos(data);
            setError('');
        } catch (err) {
            setError('Erro ao carregar produtos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const limparFormulario = () => {
        setFormData({
            name: '',
            description: '',
            price: 0,
            available: true,
            imageUrl: '',
            category: '',
        });
        setEditingId(null);
    };

    const abrirModal = (produto?: Produto) => {
        if (produto && produto.id !== undefined) {
            setFormData({
                name: produto.name,
                description: produto.description,
                price: Number(Number(produto.price).toFixed(2)),
                available: true,
                imageUrl: produto.imageUrl || '',
                category: produto.category || '',
            });
            setEditingId(produto.id);
        } else {
            limparFormulario();
        }
        setShowModal(true);
        setError('');
        setSuccess('');
    };

    const fecharModal = () => {
        setShowModal(false);
        limparFormulario();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.name || !formData.price || !formData.description) {
            setError('Preencha todos os campos obrigatórios');
            return;
        }

        try {
            if (editingId) {

                const updated = await updateProduto(editingId, {
                    name: formData.name,
                    description: formData.description,
                    price: formData.price,
                    available: formData.available,
                    imageUrl: formData.imageUrl,
                    category: formData.category,
                    restaurantId: restaurantId,
                }, usuario.token);

                setProdutos(
                    produtos.map((p) => (p.id === editingId ? updated : p))
                );
                setSuccess('Produto atualizado com sucesso!');
            } else {

                const novoP = await createProduto({
                    name: formData.name,
                    description: formData.description,
                    price: formData.price,
                    available: formData.available,
                    restaurantId,
                    imageUrl: formData.imageUrl,
                    category: formData.category,
                }, usuario.token);

                setProdutos([...produtos, novoP]);
                setSuccess('Produto criado com sucesso!');
            }

            setTimeout(() => {
                fecharModal();
                carregarProdutos();
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Erro ao salvar produto');
        }
    };

    const deletarProduto = async (id: number, nome: string) => {
        if (window.confirm(`Tem certeza que deseja deletar "${nome}"?`)) {
            try {
                await deleteProduto(id, usuario.token);
                setProdutos(produtos.filter((p) => p.id !== id));
                setSuccess('Produto deletado com sucesso!');
                setTimeout(() => setSuccess(''), 2000);
            } catch (err: any) {
                setError(err.message || 'Erro ao deletar produto');
            }
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Gestão de Produtos</h1>
                <button
                    onClick={() => abrirModal()}
                    className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                    <Plus className="w-5 h-5" />
                    Novo Produto
                </button>
            </div>


            <div className="mb-6 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por nome ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
            </div>


            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError('')}>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex justify-between items-center">
                    <span>{success}</span>
                    <button onClick={() => setSuccess('')}>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}


            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    <p className="text-gray-600 mt-2">Carregando produtos...</p>
                </div>
            ) : (
                <>

                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        {filteredProdutos.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Produto
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Descrição
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Preço
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProdutos.map((produto) => (
                                        <tr key={produto.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    {produto.imageUrl && (
                                                        <img
                                                            src={produto.imageUrl}
                                                            alt={produto.name}
                                                            className="w-10 h-10 rounded object-cover"
                                                        />
                                                    )}
                                                    <span className="font-medium text-gray-900">
                                                        {produto.name}
                                                    </span>
                                                    {produto.category && (
                                                        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded ml-2">
                                                            {produto.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs">
                                                <p className="text-sm text-gray-600 truncate">
                                                    {produto.description}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-semibold text-orange-600">
                                                    R$ {Number(produto.price).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${produto.restaurant.id
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {produto.restaurant.id ? 'Ativo' : 'Inativo'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => abrirModal(produto)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            produto.id !== undefined && deletarProduto(produto.id, produto.name)
                                                        }
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                        title="Deletar"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Nenhum produto encontrado</p>
                            </div>
                        )}
                    </div>


                    {showModal && (
                        <div 
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={fecharModal}
                        >
                            <div 
                                className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {editingId ? 'Editar Produto' : 'Novo Produto'}
                                    </h2>
                                    <button
                                        onClick={fecharModal}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nome *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, name: e.target.value })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                                                placeholder="Nome do produto"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Preço (R$) *
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={formData.price}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, price: Number(e.target.value) })
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Descrição *
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base resize-none"
                                            placeholder="Descrição do produto"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            URL da Imagem
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.imageUrl}
                                            onChange={(e) =>
                                                setFormData({ ...formData, imageUrl: e.target.value })
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                                            placeholder="https://exemplo.com/imagem.jpg"
                                        />
                                        {formData.imageUrl && (
                                            <div className="mt-3 max-h-48 overflow-hidden rounded-lg border border-gray-200">
                                                <img
                                                    src={formData.imageUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                                        >
                                            <option value="">Selecione a categoria</option>
                                            {CATEGORIES.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                                        <input
                                            type="checkbox"
                                            id="available"
                                            checked={formData.available}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    available: e.target.checked,
                                                })
                                            }
                                            className="w-5 h-5 text-orange-500 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer"
                                        />
                                        <label
                                            htmlFor="available"
                                            className="text-base font-medium text-gray-700 cursor-pointer"
                                        >
                                            Produto disponível
                                        </label>
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-6 border-t sticky bottom-0 bg-white">
                                        <button
                                            type="button"
                                            onClick={fecharModal}
                                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium
                                            cursor-pointer"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium
                                            cursor-pointer"
                                        >
                                            {editingId ? 'Atualizar' : 'Criar'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
