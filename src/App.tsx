import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Navbar } from './components/navbar/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App