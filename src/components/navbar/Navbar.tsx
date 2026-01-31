import { ShoppingCart, LogOut, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const fullName = "Juliana Matsuda";
  const firstName = fullName.split(' ')[0]; // Garante apenas "Juliana"

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <UtensilsCrossed size={24} color="#f36b21" />
        <Link to="/">
          <span style={{ color: '#f36b21', fontWeight: 'bold' }}>DeliveryApp</span>
        </Link>
      </div>

      {/* Itens alinhados horizontalmente conforme o Figma */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>

        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/produtos" style={{ textDecoration: 'none', color: '#f36b21', fontWeight: '600' }}>Produtos</Link>
          <Link to="/gerenciar-produtos" style={{ textDecoration: 'none', color: '#666' }}>
            Gerenciar Produtos
          </Link>
          <Link to="/pedidos" style={{ textDecoration: 'none', color: '#666' }}>Meus Pedidos</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '1px solid #eee', paddingLeft: '20px' }}>
          <span style={{ fontSize: '0.9rem' }}>Olá, {firstName}</span>
          <ShoppingCart size={20} style={{ cursor: 'pointer', color: '#666' }} />
          <LogOut size={20} style={{ cursor: 'pointer', color: '#666' }} />
        </div>
      </div>
    </header>
  );
}