import { ShoppingCart, LogOut, LogIn, UserIcon, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';
import { useContext, useState } from 'react';
import { ROLE } from '../../constants/constants';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const { totalItens, limparCarrinho } = useContext(CarrinhoContext);
  const firstName = usuario.name.split(' ')[0];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ativo = (path: string) => location.pathname === path;

  const handleLogoutClick = () => {
    limparCarrinho();
    handleLogout();
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link to="/" onClick={handleNavClick}>
          <img
            src="/logo.webp"
            alt="Garçom Delivery"
            className="h-16 md:h-20 w-auto object-contain cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6">
            <Link 
              to="/produtos" 
              className={`transition-colors text-sm ${ativo('/produtos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
            >
              Produtos
            </Link>
            {usuario.role === ROLE.CLIENT && usuario.token &&
              <Link 
                to="/pedidos" 
                className={`transition-colors text-sm ${ativo('/pedidos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
              >
                Meus Pedidos
              </Link>
            }
            {usuario.role === ROLE.RESTAURANT && (
              <>
                <Link 
                  to="/gerenciar-pedidos" 
                  className={`transition-colors text-sm ${ativo('/gerenciar-pedidos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
                >
                  Gerenciar Pedidos
                </Link>
                <Link 
                  to="/gerenciar-produtos" 
                  className={`transition-colors text-sm ${ativo('/gerenciar-produtos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
                >
                  Gerenciar Produtos
                </Link>
              </>
            )}
          </nav>

          {/* User Profile */}
          {usuario.token ? (
            <Link to="/perfil" className={`flex items-center gap-1 transition-colors text-sm ${ativo('/perfil') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}>
              <UserIcon size={18} />
              <span className="hidden sm:inline">{firstName}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <UserIcon size={18} />
              <span className="hidden sm:inline">Visitante</span>
            </div>
          )}

          {/* Shopping Cart */}
          {usuario.role !== ROLE.RESTAURANT &&
            <Link 
              to="/carrinho" 
              className={`relative flex items-center transition-colors ${ativo('/carrinho') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
            >
              <ShoppingCart size={20} />
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItens}
                </span>
              )}
            </Link>
          }

          {/* Logout/Login */}
          {usuario.token ? (
            <LogOut
              size={20}
              className="transition-colors text-gray-700 hover:text-orange-600 cursor-pointer"
              onClick={handleLogoutClick}
            />
          ) : (
            <LogIn
              size={20}
              className="transition-colors text-gray-700 hover:text-orange-600 cursor-pointer"
              onClick={() => navigate('/login')}
            />
          )}
        </div>

        {/* Mobile Menu Button & Icons */}
        <div className="flex md:hidden items-center gap-4">
          {/* Shopping Cart Mobile */}
          {usuario.role !== ROLE.RESTAURANT &&
            <Link 
              to="/carrinho"
              onClick={handleNavClick}
              className={`relative flex items-center transition-colors ${ativo('/carrinho') ? 'text-orange-600' : 'text-gray-700'}`}
            >
              <ShoppingCart size={20} />
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItens}
                </span>
              )}
            </Link>
          }

          {/* Logout/Login Mobile */}
          {usuario.token ? (
            <LogOut
              size={20}
              className="text-gray-700 hover:text-orange-600 cursor-pointer"
              onClick={handleLogoutClick}
            />
          ) : (
            <LogIn
              size={20}
              className="text-gray-700 hover:text-orange-600 cursor-pointer"
              onClick={() => navigate('/login')}
            />
          )}

          {/* Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:text-orange-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-4 py-4 gap-3">
            <Link 
              to="/produtos"
              onClick={handleNavClick}
              className={`py-2 transition-colors ${ativo('/produtos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
            >
              Produtos
            </Link>
            {usuario.role === ROLE.CLIENT && usuario.token &&
              <Link 
                to="/pedidos"
                onClick={handleNavClick}
                className={`py-2 transition-colors ${ativo('/pedidos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
              >
                Meus Pedidos
              </Link>
            }
            {usuario.role === ROLE.RESTAURANT && (
              <>
                <Link 
                  to="/gerenciar-pedidos"
                  onClick={handleNavClick}
                  className={`py-2 transition-colors ${ativo('/gerenciar-pedidos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
                >
                  Gerenciar Pedidos
                </Link>
                <Link 
                  to="/gerenciar-produtos"
                  onClick={handleNavClick}
                  className={`py-2 transition-colors ${ativo('/gerenciar-produtos') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
                >
                  Gerenciar Produtos
                </Link>
              </>
            )}
            {usuario.token ? (
              <Link 
                to="/perfil"
                onClick={handleNavClick}
                className={`py-2 transition-colors ${ativo('/perfil') ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-orange-600'}`}
              >
                Meu Perfil
              </Link>
            ) : (
              <span className="py-2 text-gray-400">Visitante</span>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}