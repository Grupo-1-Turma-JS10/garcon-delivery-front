import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Cadastro } from './pages/cadastro/Cadastro'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
