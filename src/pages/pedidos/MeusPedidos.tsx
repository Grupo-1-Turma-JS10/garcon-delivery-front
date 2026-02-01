import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Receipt, Package, Clock, Pencil, 
  Trash2, X, Minus, Plus, AlertTriangle 
} from 'lucide-react';

export function MeusPedidos() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Estado para gerenciar os pedidos e itens
  const [pedidos, setPedidos] = useState([
    {
      id: 'j486ouj05',
      data: '31/01/2026, 22:15:03',
      status: 'Pendente',
      itens: [
        { id: 1, nome: 'Salada Caesar', qtd: 1, preco: 22.90, img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400' },
        { id: 2, nome: 'Açaí Bowl', qtd: 1, preco: 18.50, img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400' },
        { id: 3, nome: 'Pizza Margherita', qtd: 1, preco: 35.90, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' }
      ]
    }
  ]);

  // Cálculo do total dinâmico
  const calcularTotal = () => {
    if (pedidos.length === 0) return 0;
    return pedidos[0].itens.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
  };

  // Funções de manipulação
  const alterarQuantidade = (id: number, delta: number) => {
    setPedidos(prev => prev.map(p => ({
      ...p,
      itens: p.itens.map(item => 
        item.id === id ? { ...item, qtd: Math.max(1, item.qtd + delta) } : item
      )
    })));
  };

  const removerItem = (id: number) => {
    setPedidos(prev => {
      const novosItens = prev[0].itens.filter(item => item.id !== id);
      if (novosItens.length === 0) {
        setIsEditing(false);
        return [];
      }
      return prev.map(p => ({ ...p, itens: novosItens }));
    });
  };

  const confirmarCancelamentoTotal = () => {
    setPedidos([]);
    setShowCancelModal(false);
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-50/30 animate-in fade-in duration-500">
      
      {/* 1. ABAS SUPERIORES */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 px-4 sm:px-6 py-3 font-medium transition border-b-2 whitespace-nowrap text-sm sm:text-base border-transparent text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              Produtos
            </button>
            <button className="flex items-center gap-2 px-4 sm:px-6 py-3 font-medium transition border-b-2 whitespace-nowrap text-sm sm:text-base border-orange-500 text-orange-600">
              <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />
              Meus Pedidos
            </button>
          </div>
        </div>
      </div>

      {/* 2. CONTEÚDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Meus Pedidos</h1>

        {pedidos.length > 0 ? (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Pedido #{pedido.id}</h3>
                    <p className="text-xs text-gray-500">{pedido.data}</p>
                  </div>
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800 self-start">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    Pendente
                  </span>
                </div>

                <div className="border-t pt-4 mb-4 space-y-3">
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Itens do Pedido:</h4>
                  {pedido.itens.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.img} alt={item.nome} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.nome}</p>
                        <p className="text-xs text-gray-600">Quantidade: {item.qtd} x R$ {item.preco.toFixed(2)}</p>
                      </div>
                      <span className="font-medium text-sm">R$ {(item.preco * item.qtd).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t gap-3">
                  <div>
                    <span className="text-sm text-gray-600">Total: </span>
                    <span className="text-lg sm:text-xl font-bold text-orange-600">R$ {calcularTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button onClick={() => setIsEditing(true)} className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-medium cursor-pointer">
                      <Pencil className="w-4 h-4" /> Editar
                    </button>
                    <button onClick={() => setShowCancelModal(true)} className="flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium cursor-pointer">
                      <Trash2 className="w-4 h-4" /> Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LISTA VAZIA */
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Você ainda não fez nenhum pedido</p>
            <button onClick={() => navigate('/')} className="mt-4 text-orange-600 font-bold hover:underline cursor-pointer">
              Ver cardápio agora
            </button>
          </div>
        )}
      </div>

      {/* 3. MODAL DE EDIÇÃO */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl scale-in-center">
            <div className="p-4 sm:p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Editar Pedido</h2>
                  <p className="text-xs sm:text-sm text-gray-600">Pedido #{pedidos[0]?.id}</p>
                </div>
                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-4">
                {pedidos[0]?.itens.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-3 sm:gap-4 bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100">
                    <img src={item.img} alt={item.nome} className="w-full sm:w-20 h-32 sm:h-20 object-cover rounded-lg shadow-sm" />
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base mb-1">{item.nome}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">R$ {item.preco.toFixed(2)} cada</p>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => alterarQuantidade(item.id, -1)} className="p-1 hover:bg-gray-200 rounded transition border border-gray-300 cursor-pointer">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.qtd}</span>
                        <button onClick={() => alterarQuantidade(item.id, 1)} className="p-1 hover:bg-gray-200 rounded transition border border-gray-300 cursor-pointer">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end min-w-[100px]">
                      <p className="font-bold text-orange-600 text-sm sm:text-base">
                        R$ {(item.preco * item.qtd).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removerItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-1 cursor-pointer p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-sm sm:text-base text-gray-700">Novo Total:</span>
                <span className="text-xl sm:text-2xl font-bold text-orange-600">R$ {calcularTotal().toFixed(2)}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={() => setShowCancelModal(true)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold text-sm sm:text-base cursor-pointer">
                  Cancelar Pedido
                </button>
                <button onClick={() => setIsEditing(false)} className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold text-sm sm:text-base cursor-pointer shadow-md">
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL DE CONFIRMAÇÃO DE CANCELAMENTO */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Cancelar Pedido?</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Deseja realmente cancelar este pedido? Esta ação não poderá ser desfeita.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmarCancelamentoTotal} 
                className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all cursor-pointer shadow-lg shadow-red-100"
              >
                Sim, cancelar pedido
              </button>
              <button 
                onClick={() => setShowCancelModal(false)} 
                className="w-full py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all cursor-pointer"
              >
                Não, manter pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}