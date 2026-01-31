import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Navbar } from './components/navbar/Navbar'
import { ListaProdutos } from './pages/Login/ListaProdutos'
import Cart from './components/carrinho/cart/Cart'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/carrinho" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App