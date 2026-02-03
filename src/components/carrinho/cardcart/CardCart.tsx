import { Minus, PlusIcon, Trash2, AlertTriangle } from "lucide-react"
import { useState, useContext } from "react"
import { CarrinhoContext, type ItemCarrinho } from "../../../contexts/CarrinhoContext"


function CardCart(item : ItemCarrinho) {
    const [showCancelModal, setShowCancelModal] = useState(false)
    const { atualizarQuantidade, removerProduto } = useContext(CarrinhoContext)

    function removerItem(id: number): void {
        atualizarQuantidade(id, item.quantity - 1)
    }

    function adicionarItem(id: number): void {
        atualizarQuantidade(id, item.quantity + 1)
    }

    function handleRemoverProduto(): void {
        setShowCancelModal(true)
    }

    function confirmarCancelamentoTotal(): void {
        if (item.product.id !== undefined) {
            removerProduto(item.product.id)
        }
        setShowCancelModal(false)
    }

    return (
        <div className='flex gap-4 bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
            {/* Imagem do Produto */}
            <div className='w-32 h-32 shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center'>
                <img
                    src={item.product.imageUrl}
                    className='max-h-full max-w-full object-contain'
                    alt={item.product.name}
                />
            </div>

            {/* Informações do Produto */}
            <div className='grow flex flex-col justify-between'>
                <div>
                    <h3 className='font-semibold text-gray-800 mb-1'>
                        {item.product.name}
                    </h3>
                    <p className='text-sm text-gray-600 mb-2'>
                        Categoria: {item.product.category}
                    </p>
                    <p className='text-xl font-bold text-orange-600'>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(item.product.price) * item.quantity)}
                    </p>
                </div>

                {/* Controles de Quantidade */}
                <div className='flex items-center gap-4 mt-3'>
                    <div className='flex items-center gap-2 border border-gray-300 rounded-lg'>
                        <button
                            className='p-2 hover:bg-gray-100 rounded-l-lg transition-colors'
                            onClick={() => item.product.id !== undefined && removerItem(item.product.id)}
                        >
                            <Minus size={20} className="text-gray-600" />
                        </button>

                        <span className='px-4 font-semibold text-gray-800 min-w-10 text-center'>
                            {item.quantity}
                        </span>

                        <button
                            className='p-2 hover:bg-gray-100 rounded-r-lg transition-colors'
                            onClick={() => item.product.id !== undefined && adicionarItem(item.product.id)}
                        >
                            <PlusIcon size={20} className="text-gray-600" />
                        </button>
                    </div>

                    <button
                        className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                        onClick={() => handleRemoverProduto()}
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
                    }).format(Number(item.product.price) * item.quantity)}
                </p>
            </div>

            {showCancelModal && (
                <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Remover Produto?</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Deseja remover <strong>{item.product.name}</strong> do seu carrinho?
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