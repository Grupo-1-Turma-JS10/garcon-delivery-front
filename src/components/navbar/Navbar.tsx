import { ShoppingCart, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const fullName = "Juliana Matsuda";
  const firstName = fullName.split(' ')[0];
  const ativo = (path: string) => location.pathname === path;

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }}>

      <Link to="/">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.webp"
            alt="Garçom Delivery"
            style={{ height: '100px', width: 'auto', cursor: 'pointer' }}
          />
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/produtos" className={`transition-colors ${ativo('/produtos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
            }`}>Produtos</Link>
          <Link to="/pedidos" className={`transition-colors ${ativo('/pedidos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
            }`}>Meus Pedidos</Link>
          <Link to="/gerenciar-produtos" className={`transition-colors ${ativo('/gerenciar-produtos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
            }`}>Gerenciar Produtos</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '1px solid #eee', paddingLeft: '20px' }}>
          <span style={{ fontSize: '0.9rem' }}>Olá, {firstName}</span>
          <Link to="/carrinho">
            <ShoppingCart size={20} className={`transition-colors ${ativo('/carrinho') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
              }`} />
          </Link>
          <LogOut
            size={20}
            className={`transition-colors ${ativo('/gerenciar-produtos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
              } cursor-pointer`}
            onClick={() => navigate('/')}
          />
        </div>
      </div>
    </header>
  );
}