import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Navbar } from './components/navbar/Navbar'
import { ListaProdutos } from './pages/product/ListaProdutos'
import { GerenciamentoProdutos } from './components/produto/GerenciamentoProdutos'
import Footer from './components/footer/Footer'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/gerenciar-produtos" element={<GerenciamentoProdutos restaurantId={1} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App