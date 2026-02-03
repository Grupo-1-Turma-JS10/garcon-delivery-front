import { Minus, PlusIcon, Trash2, AlertTriangle } from "lucide-react"
import { useState } from "react"


interface CardProdutosProps {
    item: Itens
}
interface Itens {
    id: number;
    nome: string;
    descricao: string;
    categoria: string;
    preco: number;
    imagem: string;
    restauranteId: number;
    quantidade: number;
}
function CardCart({ item }: CardProdutosProps) {
    const [showCancelModal, setShowCancelModal] = useState(false)

    function removerItem(id: number): void {
        const itens = JSON.parse(localStorage.getItem('cartItems') || '[]')
        const itemAtualizado = itens.map((cartItem: Itens) => {
            if (cartItem.id === id && cartItem.quantidade > 1) {
                return { ...cartItem, quantidade: cartItem.quantidade - 1 }
            }
            return cartItem
        })
        localStorage.setItem('cartItems', JSON.stringify(itemAtualizado))
        window.dispatchEvent(new Event('cartUpdated'))
    }

    function adicionarItem(id: number): void {
        const itens = JSON.parse(localStorage.getItem('cartItems') || '[]')
        const itemAtualizado = itens.map((cartItem: Itens) => {
            if (cartItem.id === id) {
                return { ...cartItem, quantidade: cartItem.quantidade + 1 }
            }
            return cartItem
        })
        localStorage.setItem('cartItems', JSON.stringify(itemAtualizado))
        window.dispatchEvent(new Event('cartUpdated'))
    }

    function removerProduto(): void {
        setShowCancelModal(true)
    }

    function confirmarCancelamentoTotal(): void {
        const itens = JSON.parse(localStorage.getItem('cartItems') || '[]')
        const itensFiltrados = itens.filter((cartItem: Itens) => cartItem.id !== item.id)
        localStorage.setItem('cartItems', JSON.stringify(itensFiltrados))
        window.dispatchEvent(new Event('cartUpdated'))
        setShowCancelModal(false)
    }

    return (
        <div className='flex gap-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
            {/* Imagem do Produto */}
            <div className='w-32 h-32 shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center'>
                <img
                    src={item.imagem}
                    className='max-h-full max-w-full object-contain'
                    alt={item.nome}
                />
            </div>

            {/* Informações do Produto */}
            <div className='grow flex flex-col justify-between'>
                <div>
                    <h3 className='font-semibold text-gray-800 mb-1'>
                        {item.nome}
                    </h3>
                    <p className='text-sm text-gray-600 mb-2'>
                        Categoria: {item.categoria}
                    </p>
                    <p className='text-xl font-bold text-orange-600'>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(item.preco)}
                    </p>
                </div>

                {/* Controles de Quantidade */}
                <div className='flex items-center gap-4 mt-3'>
                    <div className='flex items-center gap-2 border border-gray-300 rounded-lg'>
                        <button
                            className='p-2 hover:bg-gray-100 rounded-l-lg transition-colors'
                            onClick={() => removerItem(item.id)}
                        >
                            <Minus size={20} className="text-gray-600" />
                        </button>

                        <span className='px-4 font-semibold text-gray-800 min-w-10 text-center'>
                            {item.quantidade}
                        </span>

                        <button
                            className='p-2 hover:bg-gray-100 rounded-r-lg transition-colors'
                            onClick={() => adicionarItem(item.id)}
                        >
                            <PlusIcon size={20} className="text-gray-600" />
                        </button>
                    </div>

                    <button
                        className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                        onClick={() => removerProduto()}
                        title="Remover produto"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {/* Subtotal */}
            <div className='flex flex-col items-end justify-between'>
                <p className='text-lg font-bold text-orange-600'>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(item.preco * item.quantidade)}
                </p>
            </div>

            {/* Modal de Confirmação de Cancelamento */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Remover Produto?</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Deseja remover <strong>{item.nome}</strong> do seu carrinho?
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={confirmarCancelamentoTotal}
                                className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all cursor-pointer shadow-lg shadow-red-100"
                            >
                                Sim, remover
                            </button>
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="w-full py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CardCart