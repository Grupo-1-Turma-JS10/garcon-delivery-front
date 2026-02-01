import {  Minus, PlusIcon, Trash2 } from "lucide-react"


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

    function removerProduto(id: number): void {
        const itens = JSON.parse(localStorage.getItem('cartItems') || '[]')
        const itensFiltrados = itens.filter((cartItem: Itens) => cartItem.id !== id)
        localStorage.setItem('cartItems', JSON.stringify(itensFiltrados))
        window.dispatchEvent(new Event('cartUpdated'))
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
                    <h3 className='font-semibold text-orange-600 mb-1'>
                        {item.nome}
                    </h3>
                    <p className='text-sm text-orange-500 mb-2'>
                        Category: {item.categoria}
                    </p>
                    <p className='text-xl font-bold text-blue-600'>
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
                        onClick={() => removerProduto(item.id)}
                        title="Remover produto"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {/* Subtotal */}
            <div className='flex flex-col items-end justify-between'>
                <p className='text-lg font-bold text-gray-800'>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(item.preco * item.quantidade)}
                </p>
            </div>
        </div>
    )
}

export default CardCart