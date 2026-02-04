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
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            {/* Imagem do Produto */}
            <div className='w-full sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center'>
                <img
                    src={item.product.imageUrl}
                    className='max-h-full max-w-full object-contain'
                    alt={item.product.name}
                />
            </div>

            {/* Informações do Produto */}
            <div className='grow flex flex-col justify-between min-w-0'>
                <div>
                    <h3 className='font-semibold text-gray-800 mb-1 text-sm md:text-base truncate'>
                        {item.product.name}
                    </h3>
                    <p className='text-xs md:text-sm text-gray-600 mb-2'>
                        Categoria: <span className='font-medium text-orange-600'>{item.product.category}</span>
                    </p>
                    <p className='text-lg md:text-xl font-bold text-orange-600'>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(Number(item.product.price) * item.quantity)}
                    </p>
                </div>

                {/* Controles de Quantidade */}
                <div className='flex items-center gap-2 sm:gap-4 mt-2 sm:mt-3'>
                    <div className='flex items-center gap-1 border border-gray-300 rounded-lg bg-gray-50'>
                        <button
                            className='p-1.5 md:p-2 hover:bg-gray-200 rounded-l-md transition-colors'
                            onClick={() => item.product.id !== undefined && removerItem(item.product.id)}
                        >
                            <Minus size={18} className="text-gray-600 md:w-5 md:h-5" />
                        </button>

                        <span className='px-2 md:px-4 font-semibold text-gray-800 min-w-8 text-center text-sm md:text-base'>
                            {item.quantity}
                        </span>

                        <button
                            className='p-1.5 md:p-2 hover:bg-gray-200 rounded-r-md transition-colors'
                            onClick={() => item.product.id !== undefined && adicionarItem(item.product.id)}
                        >
                            <PlusIcon size={18} className="text-gray-600 md:w-5 md:h-5" />
                        </button>
                    </div>

                    <button
                        className='p-1.5 md:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto sm:ml-0'
                        onClick={() => handleRemoverProduto()}
                        title="Remover produto"
                    >
                        <Trash2 size={18} className="md:w-5 md:h-5" />
                    </button>
                </div>
            </div>

            {showCancelModal && (
                <div 
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200"
                    onClick={() => setShowCancelModal(false)}
                >
                    <div 
                        className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-12 md:w-20 h-12 md:h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                            <AlertTriangle className="w-6 md:w-10 h-6 md:h-10 text-red-500" />
                        </div>
                        <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">Remover Produto?</h3>
                        <p className="text-gray-500 mb-4 md:mb-8 leading-relaxed text-sm md:text-base">
                            Deseja remover <strong>{item.product.name}</strong> do seu carrinho?
                        </p>
                        <div className="flex flex-col gap-2 md:gap-3">
                            <button
                                onClick={confirmarCancelamentoTotal}
                                className="w-full py-2.5 md:py-3.5 bg-red-600 text-white rounded-lg md:rounded-xl font-bold hover:bg-red-700 transition-all cursor-pointer shadow-lg shadow-red-100 text-sm md:text-base"
                            >
                                Sim, remover
                            </button>
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="w-full py-2.5 md:py-3.5 bg-gray-100 text-gray-700 rounded-lg md:rounded-xl font-bold hover:bg-gray-200 transition-all cursor-pointer text-sm md:text-base"
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