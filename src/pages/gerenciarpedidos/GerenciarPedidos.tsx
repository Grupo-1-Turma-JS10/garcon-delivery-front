import React, { useState, useEffect, useContext } from 'react';
import {
  getOrdersByStatus,
  updateOrder,
  deleteOrder,
  type Order,
  type OrderStatus,
} from '../../service/OrderService';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants/constants';

const GerenciarPedidos: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

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
      const data = await getOrdersByStatus('CREATED');
      setOrders(data);
    } catch (error) {
      console.error('Erro ao buscar pedidos', error);
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm('Deseja excluir este pedido?')) return;

    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (error) {
      console.error('Erro ao excluir pedido', error);
    }
  };

  const handleEdit = (order: Order) => {
    setEditedOrder(order);
  };

  const handleSaveEdit = async () => {
    if (!editedOrder?.id) return;

    try {
      const updated = await updateOrder(editedOrder.id, {
        status: editedOrder.status,
        items: editedOrder.items,
      });

      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o))
      );

      setEditedOrder(null);
    } catch (error) {
      console.error('Erro ao atualizar pedido', error);
    }
  };

  return (
    <div>
      <h1>Gerenciar Pedidos</h1>

      {orders.map((order) => (
        <div key={order.id} style={{ borderBottom: '1px solid #ccc', padding: 10 }}>
          <p><strong>Cliente:</strong> {order.clientId}</p>
          <p><strong>Restaurante:</strong> {order.restaurantId}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                Produto {item.productId} — Qtd {item.quantity}
              </li>
            ))}
          </ul>

          <button onClick={() => handleEdit(order)}>Editar</button>
          <button onClick={() => handleDelete(order.id)}>Excluir</button>
        </div>
      ))}

      {editedOrder && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveEdit();
          }}
          style={{ marginTop: 20 }}
        >
          <h2>Editar Pedido #{editedOrder.id}</h2>

          <label>Status</label>
          <select
            value={editedOrder.status}
            onChange={(e) =>
              setEditedOrder({
                ...editedOrder,
                status: e.target.value as OrderStatus,
              })
            }
          >
            <option value="CREATED">CREATED</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="PREPARING">PREPARING</option>
            <option value="FINISHED">FINISHED</option>
            <option value="CANCELED">CANCELED</option>
          </select>

          <h3>Itens</h3>
          {editedOrder.items.map((item, index) => (
            <div key={index}>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const items = [...editedOrder.items];
                  items[index].quantity = Number(e.target.value);
                  setEditedOrder({ ...editedOrder, items });
                }}
              />
            </div>
            
          ))}

          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditedOrder(null)}>
            Cancelar
          </button>
        </form>
        
      )}
    </div>
  );
};

export default GerenciarPedidos;
