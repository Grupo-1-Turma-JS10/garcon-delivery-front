import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Navbar } from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rota do colega: Login sem Navbar */}
          <Route path="/" element={<Login />} />

          {/* Sua nova rota: Home com a Navbar */}
          <Route 
            path="/home" 
            element={
              <>
                <Navbar />
                <div style={{ padding: '20px' }}>
                   <h2>Página de Produtos</h2>
                </div>
              </>
            } 
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
