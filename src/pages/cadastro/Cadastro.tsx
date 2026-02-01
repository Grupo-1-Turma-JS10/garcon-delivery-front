import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Store, User, Loader2, CheckCircle2 } from 'lucide-react';
import type { CadastroInput, UserType } from '../../model/usuario/usuario';
import { createUser } from '../../service/UsuarioService';

export function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [formData, setFormData] = useState<CadastroInput>({
    name: '',
    document: '',
    email: '',
    password: '',
    role: 'CLIENT',
    address: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  // Lógica do contador regressivo quando o modal aparece
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showModal && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showModal && countdown === 0) {
      navigate('/');
    }
    return () => clearTimeout(timer);
  }, [showModal, countdown, navigate]);

  const cadastrarNovoUsuario = async () => {
    try {
      await createUser(formData);
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    cadastrarNovoUsuario();
  };


return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4 animate-in fade-in duration-500 relative">
    <div className={`bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full transition-all duration-300 ${showModal ? 'blur-sm pointer-events-none' : 'hover:shadow-2xl'}`}>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-4 sm:mb-6 text-sm sm:text-base transition-all group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Voltar para login
      </button>

      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 rounded-full mb-3 sm:mb-4 shadow-md transition-transform hover:scale-110">
          <Store className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Criar Conta</h1>
        <p className="text-gray-600 text-sm sm:text-base">Preencha seus dados para cadastrar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Nome completo *</label>
          <input 
            required 
            type="text" 
            placeholder="Digite seu nome completo" 
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all hover:border-orange-300" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">CPF/CNPJ *</label>
          <input 
            required 
            type="text" 
            placeholder="Digite seu CPF ou CNPJ" 
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all hover:border-orange-300" 
            value={formData.document}
            onChange={(e) => setFormData({ ...formData, document: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Email *</label>
          <input 
            required 
            type="email" 
            placeholder="seu@email.com" 
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all hover:border-orange-300" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Endereço *</label>
          <input 
            required 
            type="text" 
            placeholder="Digite seu endereço completo" 
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all hover:border-orange-300" 
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Senha *</label>
            <input 
            required 
            type="password" 
            placeholder="Mínimo 6" 
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all hover:border-orange-300" 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Confirmar *</label>
            <input 
            required 
            type="password" 
            placeholder="Repita a senha" 
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all hover:border-orange-300" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Seleção de Tipo de Usuário */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-gray-700">Tipo de usuário *</label>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button type="button" onClick={() => setFormData({ ...formData, role: 'CLIENT' })} className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-xl transition-all cursor-pointer ${formData.role === 'CLIENT' ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-300'}`}>
              <User className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 ${formData.role === 'CLIENT' ? 'text-orange-600' : 'text-orange-500'}`} />
              <span className="font-medium text-xs sm:text-sm">Cliente</span>
            </button>
            <button type="button" onClick={() => setFormData({ ...formData, role: 'RESTAURANT' })} className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-xl transition-all cursor-pointer ${formData.role === 'RESTAURANT' ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-300'}`}>
              <Store className={`w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 ${formData.role === 'RESTAURANT' ? 'text-orange-600' : 'text-orange-500'}`} />
              <span className="font-medium text-xs sm:text-sm">Restaurante</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 text-white py-2.5 sm:py-3 rounded-lg hover:bg-orange-600 hover:shadow-lg transition-all font-semibold text-sm sm:text-base shadow-md active:scale-[0.98] disabled:opacity-70 flex justify-center items-center cursor-pointer"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Criar Conta'}
        </button>
      </form>
    </div>

    {/* Modal de Sucesso */}
    {showModal && (
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px] animate-in fade-in zoom-in duration-300">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full text-center space-y-4 border border-orange-100">
          <div className="flex justify-center">
            <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce-slow" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Cadastro Realizado!</h2>
          <p className="text-gray-600 leading-relaxed">
            Seja bem-vindo ao <span className="text-orange-600 font-bold">Garçon Delivery</span>. Prepare-se para uma experiência incrível.
          </p>
          <div className="bg-orange-50 py-3 rounded-xl">
            <p className="text-sm text-orange-700 font-medium italic">
              Redirecionando para o login em <span className="text-lg font-bold not-italic">{countdown}s</span>...
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);
}