import { AlertTriangle } from 'lucide-react';
import {
  updateOrder,
  getOrdersByRestaurant,
  cancelOrder,
} from '../../service/OrderService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants/constants';
import type { Order, OrderItemRequest } from '../../model/order/order';
import { useContext, useEffect, useState } from 'react';
import { getStatusColor, getStatusLabel } from '../../utils/orderStatus';
import { StatusIcon } from '../../components/order/StatusIcon';
import { StatusFilter } from '../../components/order/StatusFilter';

const GerenciarPedidos: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; orderId?: number }>({ isOpen: false });
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = usuario.token || '';

  useEffect(() => {
    if (usuario.role !== ROLE.RESTAURANT || !usuario.token) {
      navigate('/');
    }

  }, [usuario, navigate]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const data = await getOrdersByRestaurant(usuario.id, token);
      setOrders(data);
    } catch (error) {
      console.error('Erro ao buscar pedidos', error);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    setDeleteModal({ isOpen: true, orderId: id });
  };

  const confirmarExclusao = async () => {
    const orderId = deleteModal.orderId;
    if (!orderId) return;

    try {
      // Encontrar o pedido a ser cancelado
      const orderToCancel = orders.find((o) => o.id === orderId);
      if (!orderToCancel) return;

      // Mapear items para OrderItemRequest
      const itemsRequest: OrderItemRequest[] = orderToCancel.items.map((item) => ({
        productId: item.product?.id ?? item.productId ?? 0,
        quantity: item.quantity,
        observations: item.observations || "",
      }));

      // Cancelar o pedido usando o método cancelOrder
      const updated = await cancelOrder(orderId, {
        status: 'CANCELED',
        items: itemsRequest,
      }, token);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? updated : o))
      );
      setDeleteModal({ isOpen: false });
    } catch (error) {
      console.error('Erro ao cancelar pedido', error);
      setDeleteModal({ isOpen: false });
    }
  };

  const cancelarExclusao = () => {
    setDeleteModal({ isOpen: false });
  };

  const handleEdit = (order: Order) => {
    setEditedOrder(order);
  };

  const handleSaveEdit = async () => {
    if (!editedOrder?.id) return;

    try {
      // Mapear items para OrderItemRequest
      const itemsRequest: OrderItemRequest[] = editedOrder.items.map((item) => ({
        productId: item.product?.id ?? item.productId ?? 0,
        quantity: item.quantity,
        observations: item.observations || "",
      }));

      const updated = await updateOrder(editedOrder.id, {
        status: editedOrder.status,
        items: itemsRequest,
      }, token);

      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o))
      );

      setEditedOrder(null);
    } catch (error) {
      console.error('Erro ao atualizar pedido', error);
    }
  };

  // Filtrar pedidos por status
  const filteredOrders = statusFilter === 'all'
    ? orders.sort((a, b) => b.id - a.id)
    : orders.filter((order) => order.status === statusFilter).sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gerenciar Pedidos</h1>
          <p className="text-gray-600">Total de pedidos: {filteredOrders.length}</p>
        </div>

        <StatusFilter 
          selectedStatus={statusFilter} 
          onStatusChange={setStatusFilter}
          showLabel={true}
        />

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">Nenhum pedido encontrado neste status</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Pedido #{order.id}</h2>
                      <p className="text-gray-600 text-base mt-1"><strong>Cliente:</strong> {order.client.name}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-semibold text-base flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      <StatusIcon status={order.status} />
                      {getStatusLabel(order.status)}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">Itens do Pedido</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-base border-b border-gray-200 pb-2 last:border-0 gap-3">
                          {item.product?.imageUrl && (
                            <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded shadow-sm flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">{item.product?.name || `Produto ${item.productId}`}</p>
                            {item.observations && <p className="text-gray-600 text-sm">Obs: {item.observations}</p>}
                          </div>
                          <p className="text-gray-700 ml-4"><strong>Qtd:</strong> {item.quantity}</p>
                          <p className="text-gray-700 ml-4"><strong>Preço:</strong> {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format((item.price ?? 0) * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                    <p className="text-right text-2xl font-bold text-orange-600">
                      Total: {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(order.total)}
                    </p>
                  </div>

                  {order.status !== 'CANCELED' && order.status !== 'FINISHED' &&
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(order)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors
                        cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  }
                </div>
              </div>
            ))}
          </div>
        )}

        {editedOrder && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setEditedOrder(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Editar Pedido #{editedOrder.id}</h2>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEdit();
                }}
                className="p-6 space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Status do Pedido</label>
                  <select
                    value={editedOrder.status}
                    onChange={(e) =>
                      setEditedOrder({
                        ...editedOrder,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="CREATED">Criado</option>
                    <option value="CONFIRMED">Confirmado</option>
                    <option value="PREPARING">Preparando</option>
                    <option value="FINISHED">Finalizado</option>
                    <option value="CANCELED">Cancelado</option>
                  </select>
                </div>

                {/*<div>
                  <h3 className="font-semibold text-gray-900 mb-4">Itens do Pedido</h3>
                  <div className="space-y-4">
                    {editedOrder.items.map((item, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-medium text-gray-900 mb-2">
                          {item.product?.name || `Produto ${item.productId}`}
                        </p>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantidade
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const items = [...editedOrder.items];
                            items[index].quantity = Number(e.target.value);
                            setEditedOrder({ ...editedOrder, items });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {item.observations && (
                          <p className="text-gray-600 text-sm mt-2">Obs: {item.observations}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                */}

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Salvar Alterações
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditedOrder(null)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Excluir Pedido?</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Tem certeza que deseja excluir o pedido <strong>#{deleteModal.orderId}</strong>? Esta ação não pode ser desfeita.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={cancelarExclusao}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmarExclusao}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Sim, excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GerenciarPedidos;
