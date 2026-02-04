import { ShoppingCart, LogOut, LogIn, UserIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';
import { useContext } from 'react';
import { ROLE } from '../../constants/constants';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const { totalItens, limparCarrinho } = useContext(CarrinhoContext);
  const firstName = usuario.name.split(' ')[0];
  const ativo = (path: string) => location.pathname === path;

  const handleLogoutClick = () => {
    limparCarrinho();
    handleLogout();
  };

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
        <div className="flex items-center max-w-full">
          <img
            src="/logo.webp"
            alt="Garçom Delivery"
            className="h-[100px] w-auto max-w-full object-contain cursor-pointer"
          />
        </div>

      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/produtos" className={`transition-colors ${ativo('/produtos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
            }`}>Produtos</Link>
          {usuario.role === ROLE.CLIENT && usuario.token &&
            <Link to="/pedidos" className={`transition-colors ${ativo('/pedidos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
              }`}>Meus Pedidos</Link>
          }
          {usuario.role === ROLE.RESTAURANT && (
            <>
              <Link to="/gerenciar-pedidos" className={`transition-colors ${ativo('/gerenciar-pedidos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
                }`}>Gerenciar Pedidos</Link>
              <Link to="/gerenciar-produtos" className={`transition-colors ${ativo('/gerenciar-produtos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
                }`}>Gerenciar Produtos</Link>
            </>
          )}
        </nav>

        {usuario.token ? (
          <Link to="/perfil">
            <div className='flex gap-0.5'>
              <UserIcon size={20} className={`transition-colors ${ativo('/carrinho') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
                }`} />
              <span className={`transition-colors ${ativo('/perfil') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
                }`}>Olá, {firstName}</span>
            </div>
          </Link>
        ) : (
          <div className='flex gap-0.5'>
            <UserIcon size={20} className='text-gray-400' />
            <span style={{ fontSize: '0.9rem' }} className='text-gray-400'>Olá, Visitante</span>
          </div>
        )}

        <div className={`transition-colors ${ativo('/carrinho') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
          } flex items-center gap-6`}>
          {usuario.role !== ROLE.RESTAURANT &&
            <Link to="/carrinho" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <ShoppingCart size={20} className={`transition-colors ${ativo('/carrinho') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'
                }`} />
              {totalItens > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#f97316',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {totalItens}
                </span>
              )}
            </Link>
          }
        </div>

        {usuario.token ? (
          <LogOut
            size={20}
            className={'transition-color hover:text-orange-600 cursor-pointer'}
            onClick={handleLogoutClick}
          />
        ) : (
          <LogIn
            size={20}
            className={'transition-color hover:text-orange-600 cursor-pointer'}
            onClick={() => navigate('/login')}
          />
        )}
      </div>
    </header >
  );
}