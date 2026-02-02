import CardCart from '../cardcart/CardCart'
import { ShoppingCart } from 'lucide-react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'


function Cart() {
	const [cartItems, setCartItems] = useState<any[]>([])
	const { usuario } = useContext(AuthContext)
	const navigate = useNavigate()
	
	// Item de teste para visualização
	const itemTeste = {
		id: 1,
		nome: 'Pizza Margherita',
		descricao: 'Pizza clássica com tomate, mozzarela e manjericão',
		categoria: 'Pizzas',
		preco: 35.90,
		imagem: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
		restauranteId: 1,
		quantidade: 1
	}

	// Inicializar o carrinho na primeira renderização
	useEffect(() => {
		const itens = JSON.parse(localStorage.getItem('cartItems') || '[]')
		if (itens.length === 0) {
			// Se estiver vazio, salva o item de teste no localStorage
			localStorage.setItem('cartItems', JSON.stringify([itemTeste]))
			setCartItems([itemTeste])
		} else {
			setCartItems(itens)
		}
	}, [])

		// Listener para atualizar o carrinho quando há mudanças
		useEffect(() => {
			const handleCartUpdate = () => {
				const itens = JSON.parse(localStorage.getItem('cartItems') || '[]')
				setCartItems(itens)
			}
		
			window.addEventListener('cartUpdated', handleCartUpdate)
			return () => window.removeEventListener('cartUpdated', handleCartUpdate)
		}, [])
	
	const quantidadeItems = cartItems.reduce(
		(total: number, item: { quantidade: number }) => total + item.quantidade,
		0
	)
	const valorTotal = cartItems.reduce(
		(total: number, item: { preco: number, quantidade: number }) => total + (item.preco * item.quantidade),
		0
	)

	const limparCart = () => {
		localStorage.removeItem('cartItems')
		window.location.reload()
	}

	const handleFinalizarCompra = () => {
		if (!usuario.token) {
			navigate('/login')
			return
		}
		
		limparCart()
		alert('Compra finalizada!')
	}

	return (
		<div className="min-h-screen bg-orange-100 py-8">
			<div className="container mx-auto px-4">
				{/* Cabeçalho */}
				<h1 className="text-3xl md:text-4xl text-center text-orange-600 mb-8">
					Carrinho de Compras
				</h1>

				{/* Carrinho Vazio */}
				{cartItems.length === 0 && (
					<div className="bg-white rounded-lg shadow-sm p-12 text-center">
						<ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
						<h2 className="text-xl font-semibold text-gray-600 mb-2">
							Seu carrinho está vazio
						</h2>
						<p className="text-gray-500">
							Adicione produtos para começar suas compras!
						</p>
					</div>
				)}

				{/* Layout Principal: Lista de Produtos + Resumo */}
				{cartItems.length > 0 && (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Coluna Esquerda: Lista de Produtos */}
						<div className="lg:col-span-2 space-y-4">
							{cartItems.map((item: any) => (
								<CardCart key={item.id} item={item} />
							))}
						</div>

						{/* Coluna Direita: Resumo da Compra */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
								<h2 className="text-xl font-bold text-orange-500 mb-4 pb-4 border-b border-gray-200">
									Resumo da Compra
								</h2>

								<div className="space-y-3 mb-6">
									<div className="flex justify-between text-gray-600">
										<span>Produtos ({quantidadeItems})</span>
										<span className="font-semibold text-gray-800">
											{Intl.NumberFormat('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											}).format(valorTotal)}
										</span>
									</div>

									<div className="flex justify-between text-gray-600">
										<span>Frete</span>
										<span className="font-semibold text-orange-500">
											Grátis
										</span>
									</div>

									<div className="flex justify-between text-gray-600">
										<span>Desconto</span>
										<span className="font-semibold text-gray-800">
											{Intl.NumberFormat('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											}).format(0.0)}
										</span>
									</div>
								</div>

								<div className="flex justify-between items-center text-lg font-bold py-4 mb-6 border-t border-gray-200">
									<span className="text-gray-800">Total</span>
									<span className="text-2xl text-blue-600">
										{Intl.NumberFormat('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										}).format(valorTotal)}
									</span>
								</div>

								{/* Formas de Pagamento */}
								<div className="mb-4 pb-4 border-b border-gray-200">
									<p className="text-sm text-gray-600 mb-3">Formas de pagamento:</p>
									<div className="flex flex-wrap gap-2 justify-center">
										<div className="flex flex-row bg-gray-100 p-2 rounded text-xs font-semibold text-gray-700">
											<img 
												src='https://ik.imagekit.io/vzr6ryejm/ecommerce/credit-card.png'
												alt='Logo Cartão de Crédito'
												className='w-10'
											></img>
										</div>
										<div className="flex flex-row items-center gap-1 bg-gray-100 p-2 rounded text-xs font-semibold text-gray-700">
											<img 
												src='https://ik.imagekit.io/vzr6ryejm/ecommerce/pix-svgrepo-com.svg'
												alt='Logo do PIX'
												className='w-4'
											></img>
											<span>PIX</span>
										</div>
										<div className="flex flex-row bg-gray-100 p-2 rounded text-xs font-semibold text-gray-700">
											<img 
												src='https://ik.imagekit.io/vzr6ryejm/ecommerce/google-pay-svgrepo-com.svg'
												alt='Logo do Google Pay'
												className='w-8'
											></img>
										</div>
										<div className="flex flex-row bg-gray-100 p-2 rounded text-xs font-semibold text-gray-700">
											<img 
												src='https://ik.imagekit.io/vzr6ryejm/ecommerce/apple-pay-svgrepo-com.svg'
												alt='Logo do Apple Pay'
												className='w-8'
											></img>
										</div>					
									</div>
								</div>

								<button
									className="w-full bg-orange-500 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors"
									type="button"
									onClick={handleFinalizarCompra}
								>
									Finalizar Compra
								</button>

								<p className="text-xs text-gray-500 text-center mt-4">
									Frete grátis para Porto Alegre - RS
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart