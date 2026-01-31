import { ShoppingCart, LogOut } from 'lucide-react'; // Removi o UtensilsCrossed que não será mais usado

export function Navbar() {
  const fullName = "Juliana Matsuda"; 
  const firstName = fullName.split(' ')[0];

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }}>
      
      {/* Logo com a imagem do Garçom Delivery */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="/logo.webp" 
          alt="Garçom Delivery" 
          style={{ height: '100px', width: 'auto', cursor: 'pointer' }} 
        />
      </div>

      {/* Itens alinhados conforme o Figma */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        
        <nav style={{ display: 'flex', gap: '20px' }}>
          <a href="/home" style={{ textDecoration: 'none', color: '#f36b21', fontWeight: '600' }}>Produtos</a>
          <a href="/pedidos" style={{ textDecoration: 'none', color: '#666' }}>Meus Pedidos</a>
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