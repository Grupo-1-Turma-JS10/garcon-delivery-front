import { useState, useEffect, useContext } from 'react';
import { Edit2, Trash2, Plus, Search, X, AlertTriangle } from 'lucide-react';
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
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; produtoId?: number; produtoNome?: string }>({ isOpen: false });
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
        setDeleteModal({ isOpen: true, produtoId: id, produtoNome: nome });
    };

    const confirmarExclusao = async () => {
        const { produtoId } = deleteModal;
        if (!produtoId) return;

        try {
            await deleteProduto(produtoId, usuario.token);
            setProdutos(produtos.filter((p) => p.id !== produtoId));
            setSuccess('Produto deletado com sucesso!');
            setDeleteModal({ isOpen: false });
            setTimeout(() => setSuccess(''), 2000);
        } catch (err: any) {
            setError(err.message || 'Erro ao deletar produto');
            setDeleteModal({ isOpen: false });
        }
    };

    const cancelarExclusao = () => {
        setDeleteModal({ isOpen: false });
    };

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestão de Produtos</h1>
                <button
                    onClick={() => abrirModal()}
                    className="flex items-center justify-center sm:justify-start gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition text-sm md:text-base whitespace-nowrap"
                >
                    <Plus className="w-4 md:w-5 h-4 md:h-5" />
                    Novo Produto
                </button>
            </div>


            <div className="mb-4 md:mb-6 relative">
                <Search className="absolute left-3 top-2.5 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por nome ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                />
            </div>


            {error && (
                <div className="mb-4 p-3 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center text-sm md:text-base">
                    <span>{error}</span>
                    <button onClick={() => setError('')}>
                        <X className="w-4 md:w-5 h-4 md:h-5" />
                    </button>
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 md:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex justify-between items-center text-sm md:text-base">
                    <span>{success}</span>
                    <button onClick={() => setSuccess('')}>
                        <X className="w-4 md:w-5 h-4 md:h-5" />
                    </button>
                </div>
            )}


            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    <p className="text-gray-600 mt-2 text-sm md:text-base">Carregando produtos...</p>
                </div>
            ) : (
                <>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
                        {filteredProdutos.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Produto
                                        </th>
                                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Descrição
                                        </th>
                                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Preço
                                        </th>
                                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProdutos.map((produto) => (
                                        <tr key={produto.id} className="hover:bg-gray-50">
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    {produto.imageUrl && (
                                                        <img
                                                            src={produto.imageUrl}
                                                            alt={produto.name}
                                                            className="w-8 md:w-10 h-8 md:h-10 rounded object-cover shrink-0"
                                                        />
                                                    )}
                                                    <span className="font-medium text-gray-900 text-sm md:text-base">
                                                        {produto.name}
                                                    </span>
                                                    {produto.category && (
                                                        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded ml-2 hidden lg:inline">
                                                            {produto.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 max-w-xs">
                                                <p className="text-xs md:text-sm text-gray-600 truncate">
                                                    {produto.description}
                                                </p>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                <span className="font-semibold text-orange-600 text-sm md:text-base">
                                                    R$ {Number(produto.price).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${produto.restaurant.id
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {produto.restaurant.id ? 'Ativo' : 'Inativo'}
                                                </span>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                                <div className="flex gap-1 md:gap-2">
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

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {filteredProdutos.length > 0 ? (
                            filteredProdutos.map((produto) => (
                                <div key={produto.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
                                    <div className="flex gap-3 mb-3">
                                        {produto.imageUrl && (
                                            <img
                                                src={produto.imageUrl}
                                                alt={produto.name}
                                                className="w-16 h-16 rounded object-cover shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-base truncate">{produto.name}</h3>
                                            {produto.category && (
                                                <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded inline-block mt-1">
                                                    {produto.category}
                                                </span>
                                            )}
                                            <p className="text-xs text-gray-600 mt-2 line-clamp-2">{produto.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                        <div>
                                            <p className="text-xs text-gray-600">Preço</p>
                                            <span className="font-semibold text-orange-600 text-base">R$ {Number(produto.price).toFixed(2)}</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-600">Status</p>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${produto.restaurant.id ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {produto.restaurant.id ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </div>
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
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg shadow">
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
                                <div className="flex justify-between items-center p-4 md:p-6 border-b sticky top-0 bg-white">
                                    <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                                        {editingId ? 'Editar Produto' : 'Novo Produto'}
                                    </h2>
                                    <button
                                        onClick={fecharModal}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 md:w-6 h-5 md:h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto flex-1">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                                                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
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
                                                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
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
                                            rows={4}
                                            className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base resize-none"
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
                                            className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
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
                                            className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                                        >
                                            <option value="">Selecione a categoria</option>
                                            {CATEGORIES.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-center gap-3 bg-gray-50 p-3 md:p-4 rounded-lg">
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
                                            className="text-sm md:text-base font-medium text-gray-700 cursor-pointer"
                                        >
                                            Produto disponível
                                        </label>
                                    </div>

                                    {error && (
                                        <div className="p-3 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm md:text-base">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 md:pt-6 border-t sticky bottom-0 bg-white">
                                        <button
                                            type="button"
                                            onClick={fecharModal}
                                            className="flex-1 px-6 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium cursor-pointer text-sm md:text-base"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-6 py-2 md:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium cursor-pointer text-sm md:text-base"
                                        >
                                            {editingId ? 'Atualizar' : 'Criar'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {deleteModal.isOpen && (
                        <div 
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                            onClick={cancelarExclusao}
                        >
                            <div 
                                className="bg-white rounded-lg shadow-xl max-w-sm w-full text-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 md:p-6">
                                    <div className="w-12 md:w-16 h-12 md:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                        <AlertTriangle className="w-6 md:w-8 h-6 md:h-8 text-red-500" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Excluir Produto?</h3>
                                    <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                                        Tem certeza que deseja excluir o produto <strong>"{deleteModal.produtoNome}"</strong>? Esta ação não pode ser desfeita.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                        <button
                                            onClick={cancelarExclusao}
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={confirmarExclusao}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm md:text-base"
                                        >
                                            Sim, excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
