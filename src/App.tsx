import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Cadastro } from './pages/cadastro/Cadastro'
import { Navbar } from './components/navbar/Navbar'
import { ListaProdutos } from './pages/product/ListaProdutos'
import Cart from './components/carrinho/cart/Cart'
import { GerenciamentoProdutos } from './components/produto/GerenciamentoProdutos'
import Footer from './components/footer/Footer'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
      
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/gerenciar-produtos" element={<GerenciamentoProdutos restaurantId={2} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

<<<<<<< Updated upstream
export default App
=======
export default App

>>>>>>> Stashed changes
