import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importado para gerenciar a navegação das rotas
import { ArrowLeft, User, FileText, Mail, Lock, MapPin, Save, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface UserProfileProps {
  onBack?: () => void; // O "?" torna a prop opcional, resolvendo o erro no App.tsx
}

export function UserProfile({ onBack }: UserProfileProps) {
  const navigate = useNavigate(); // Hook para redirecionar caso onBack não exista
  
  const [formData, setFormData] = useState({
    name: 'Teste',
    document: '0000000',
    email: 'teste@teste.com',
    password: '123456',
    address: 'Rua Teste, 140'
  });

  // Estados para controlar os Modais e o contador
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Função para lidar com o redirecionamento
  const handleRedirect = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/produtos'); // Rota de destino caso usado em um <Route />
    }
  };

  // Efeito para o contador de redirecionamento
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSaveModalOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isSaveModalOpen && countdown === 0) {
      handleRedirect();
    }
    return () => clearTimeout(timer);
  }, [isSaveModalOpen, countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaveModalOpen(true);
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(false);
    navigate('/'); // Redireciona para home após excluir
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Botão Voltar - Usa handleRedirect ou histórico do navegador */}
      <button 
        onClick={() => (onBack ? onBack() : navigate(-1))}
        className="flex items-center text-gray-600 hover:text-orange-600 mb-6 transition-all group cursor-pointer font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Voltar
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        {/* Header */}
        <div className="bg-orange-500 p-6 text-white">
          <h2 className="text-2xl font-bold">Editar Perfil</h2>
          <p className="text-orange-100">Atualize suas informações pessoais</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                Nome Completo
              </label>
              <input 
                type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                Documento (CPF/CNPJ)
              </label>
              <input 
                type="text" name="document" value={formData.document} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                E-mail
              </label>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                Senha
              </label>
              <input 
                type="password" name="password" value={formData.password} onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              Endereço Completo
            </label>
            <input 
              type="text" name="address" value={formData.address} onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
              required 
            />
          </div>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full bg-white text-red-600 border border-red-200 py-3 rounded-xl font-bold hover:bg-red-50 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Excluir Conta
            </button>

            <button 
              type="submit" 
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Confirmar exclusão</h3>
              <p className="text-gray-500 mt-2">Tem certeza? Esta ação é irreversível.</p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button onClick={handleDeleteAccount} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 cursor-pointer">
                Sim, excluir minha conta
              </button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 cursor-pointer">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Informação: Dados Atualizados */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4 animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Dados atualizados!</h3>
              <p className="text-gray-500 mt-2 leading-relaxed">
                Suas informações foram salvas com sucesso. Você será redirecionado para a página de <span className="font-semibold text-gray-700">Produtos</span> em <span className="font-bold text-orange-600">{countdown} segundos</span>.
              </p>
            </div>
            <div className="pt-2">
              <button 
                onClick={handleRedirect} 
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-orange-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}