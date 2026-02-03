import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Cadastro } from './pages/cadastro/Cadastro'
import { Navbar } from './components/navbar/Navbar'
import { ListaProdutos } from './pages/product/ListaProdutos'
import Cart from './components/carrinho/cart/Cart'
import { GerenciamentoProdutos } from './pages/gerenciarProdutos/GerenciamentoProdutos'
import Footer from './components/footer/Footer'
import { MeusPedidos } from './pages/pedidos/MeusPedidos'
import GerenciarPedidos from './pages/gerenciarpedidos/GerenciarPedidos'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AboutUsPage } from './pages/sobre/AboutUs'
import { AuthProvider } from './contexts/AuthContext'
import { CarrinhoProvider } from './contexts/CarrinhoContext'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CarrinhoProvider>
            <ToastContainer />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 px-6 py-6">
              <Routes>
                <Route path="/" element={<ListaProdutos />} />
                <Route path="/produtos" element={<ListaProdutos />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/gerenciar-pedidos" element={<GerenciarPedidos />} />
                <Route path="/gerenciar-produtos" element={<GerenciamentoProdutos />} />
                <Route path="/pedidos" element={<MeusPedidos />} />
                <Route path="/sobre" element={<AboutUsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          </CarrinhoProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
