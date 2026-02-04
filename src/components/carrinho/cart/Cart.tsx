import CardCart from '../cardcart/CardCart'
import { ShoppingCart } from 'lucide-react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { CarrinhoContext, type ItemCarrinho } from '../../../contexts/CarrinhoContext'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { SugestoSaudavel } from '../../sugestoesaudavel/SugestoSaudavel'
import { HEALTHY_CATEGORIES } from '../../../constants/constants'


function Cart() {
	const { usuario } = useContext(AuthContext)
	const { itens, totalItens, totalValor, finalizarCompra, adicionarProduto } = useContext(CarrinhoContext)
	const navigate = useNavigate()

	// Verificar se há produtos saudáveis no carrinho
	const temProdutoSaudavel = itens.some(item =>
		HEALTHY_CATEGORIES.includes(item.product.category)
	)

	// Obter restaurantId do primeiro item (todos os itens têm o mesmo restaurante)
	const restaurantId = itens.length > 0 ? Number(itens[0].product.restaurant.id) : null

	const handleFinalizarCompra = () => {
		if (!usuario.token) {
			navigate('/login')
			return
		}

		finalizarCompra(usuario.id).then(() => {
			ToastAlerta('Compra finalizada com sucesso!', 'success')
		}).catch(() => {
			ToastAlerta('Erro ao finalizar a compra. Tente novamente.', 'error')
		})
	}

	return (
		<div className="min-h-screen bg-gray-50 py-4 md:py-8">
			<div className="container mx-auto px-4">
				{/* Cabeçalho */}
				<h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-black mb-4 md:mb-8 font-bold">
					Sacola de Compras
				</h1>

				{/* Sacola Vazia */}
				{itens.length === 0 && (
					<div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center border border-gray-200">
						<ShoppingCart size={48} className="mx-auto text-gray-300 mb-4 md:w-16 md:h-16" />
						<h2 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">
							Seu carrinho está vazio
						</h2>
						<p className="text-orange-600 text-base md:text-lg font-semibold">
							Adicione produtos para começar suas compras!
						</p>
					</div>
				)}

				{/* Layout Principal: Lista de Produtos + Resumo */}
				{itens.length > 0 && (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
						{/* Coluna Esquerda: Lista de Produtos */}
						<div className="lg:col-span-2 space-y-3 md:space-y-4">
							{/* Sugestão de Produtos Saudáveis */}
							{!temProdutoSaudavel && restaurantId && (
								<SugestoSaudavel
									restaurantId={restaurantId}
									onAddProduct={(product) => {
										adicionarProduto(product, String(restaurantId))
										ToastAlerta(`${product.name} adicionado ao carrinho!`, 'success')
									}}
								/>
							)}

							{itens.map((item: ItemCarrinho) => (
								<CardCart key={item.product.id} {...item} />
							))}
						</div>

						{/* Coluna Direita: Resumo da Compra */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-4 border border-gray-200">
								<h2 className="text-lg md:text-xl font-bold text-orange-600 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-gray-200">
									Resumo da Compra
								</h2>

								<div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
									<div className="flex justify-between text-gray-600 text-sm md:text-base">
										<span>Produtos ({totalItens})</span>
										<span className="font-semibold text-gray-800">
											{Intl.NumberFormat('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											}).format(totalValor)}
										</span>
									</div>

									<div className="flex justify-between text-gray-600 text-sm md:text-base">
										<span>Frete</span>
										<span className="font-semibold text-green-600">
											Grátis
										</span>
									</div>

									<div className="flex justify-between text-gray-600 text-sm md:text-base">
										<span>Desconto</span>
										<span className="font-semibold text-gray-800">
											{Intl.NumberFormat('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											}).format(0.0)}
										</span>
									</div>

									<div className="flex justify-between items-center font-bold py-3 md:py-4 mb-4 md:mb-6 border-t border-gray-200 text-base md:text-lg">
										<span className="text-gray-800">Total</span>
										<span className="text-xl md:text-2xl text-orange-600">
											{Intl.NumberFormat('pt-BR', {
												style: 'currency',
												currency: 'BRL',
											}).format(totalValor)}
										</span>
									</div>

									{/* Formas de Pagamento */}
									<div className="mb-3 md:mb-4 pb-3 md:pb-4 border-b border-gray-200">
										<p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">Formas de pagamento:</p>
										<div className="flex flex-wrap gap-1 md:gap-2 justify-center">
											<div className="flex flex-row bg-gray-100 p-1.5 md:p-2 rounded text-xs font-semibold text-gray-700">
												<img
													src='https://ik.imagekit.io/vzr6ryejm/ecommerce/credit-card.png'
													alt='Logo Cartão de Crédito'
													className='w-8 md:w-10'
												></img>
											</div>
											<div className="flex flex-row items-center gap-1 bg-gray-100 p-1.5 md:p-2 rounded text-xs font-semibold text-gray-700">
												<img
													src='https://ik.imagekit.io/vzr6ryejm/ecommerce/pix-svgrepo-com.svg'
													alt='Logo do PIX'
													className='w-3 md:w-4'
												></img>
												<span className="hidden sm:inline">PIX</span>
											</div>
											<div className="flex flex-row bg-gray-100 p-1.5 md:p-2 rounded text-xs font-semibold text-gray-700">
												<img
													src='https://ik.imagekit.io/vzr6ryejm/ecommerce/google-pay-svgrepo-com.svg'
													alt='Logo do Google Pay'
													className='w-6 md:w-8'
												></img>
											</div>
											<div className="flex flex-row bg-gray-100 p-1.5 md:p-2 rounded text-xs font-semibold text-gray-700">
												<img
													src='https://ik.imagekit.io/vzr6ryejm/ecommerce/apple-pay-svgrepo-com.svg'
													alt='Logo do Apple Pay'
													className='w-6 md:w-8'
												></img>
											</div>
										</div>
									</div>

									<button
										className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 md:py-3 rounded-lg transition-colors text-sm md:text-base"
										type="button"
										onClick={handleFinalizarCompra}
									>
										Finalizar Compra
									</button>

									<p className="text-xs text-gray-500 text-center mt-3 md:mt-4">
										Frete grátis para Porto Alegre - RS
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Cart