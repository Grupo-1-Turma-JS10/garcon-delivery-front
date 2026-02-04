import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package
} from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import { ROLE } from '../../constants/constants';
import type { Order } from '../../model/order/order';
import { getOrdersByClient } from '../../service/OrderService';
import { getStatusColor, getStatusLabel } from '../../utils/orderStatus';
import { StatusIcon } from '../../components/order/StatusIcon';
import { StatusFilter } from '../../components/order/StatusFilter';

export function MeusPedidos() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.role !== ROLE.CLIENT || !usuario.token) {
      navigate('/');
    }
  }, [usuario, navigate]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const data = await getOrdersByClient(usuario.id, usuario.token);
      // Ordena do maior ID para o menor
      setOrders(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Erro ao buscar pedidos', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50/30 animate-in fade-in duration-500">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Meus Pedidos</h1>

        <StatusFilter 
          selectedStatus={statusFilter} 
          onStatusChange={setStatusFilter}
          showLabel={false}
        />

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders
              .filter((order) => statusFilter === 'all' || order.status === statusFilter)
              .map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 transition-all hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl mb-1">Pedido #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                    </p>
                  </div>
                  <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(order.status)} self-start`}>
                    <StatusIcon status={order.status} />
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                <div className="border-t pt-4 mb-4 space-y-3">
                  <h4 className="font-medium mb-2 text-base sm:text-lg">Itens do Pedido:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {item.product?.imageUrl && (
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded shadow-sm" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-base truncate">{item.product?.name || `Produto ${item.productId}`}</p>
                        {item.observations && <p className="text-sm text-gray-600">Obs: {item.observations}</p>}
                        <p className="text-sm text-gray-600">Quantidade: {item.quantity} x R$ {Number(item.price).toFixed(2)}</p>
                      </div>
                      <span className="font-medium text-base">R$ {(Number(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t gap-3">
                  <div>
                    <span className="text-base text-gray-600">Total: </span>
                    <span className="text-2xl sm:text-3xl font-bold text-orange-600">R$ {Number(order.total).toFixed(2)}</span>
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
    </div>
  );
}