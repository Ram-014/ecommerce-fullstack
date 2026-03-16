import React, { useState, useEffect } from 'react';
import { getMyOrders, cancelOrder } from '../../api/api';
import Spinner from '../../components/common/Spinner';
import { useNavigate } from 'react-router-dom';

const STATUS_COLORS = {
  PENDING: '#f59e0b',
  CONFIRMED: '#2563EB',
  SHIPPED: '#7c3aed',
  DELIVERED: '#16a34a',
  CANCELLED: '#dc2626',
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    getMyOrders()
      .then(r => setOrders(r.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return;
    try {
      const res = await cancelOrder(orderId);
      setOrders(orders.map(o => o.orderId === orderId ? res.data : o));
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot cancel order');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📦 My Orders</h1>

      {orders.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: '64px' }}>📦</p>
          <p>No orders yet!</p>
          <button style={styles.shopBtn} onClick={() => navigate('/products')}>Start Shopping</button>
        </div>
      ) : (
        <div style={styles.list}>
          {orders.map(order => (
            <div key={order.orderId} style={styles.card}>
              <div style={styles.cardHeader} onClick={() => setExpandedOrder(expandedOrder === order.orderId ? null : order.orderId)}>
                <div>
                  <span style={styles.orderId}>Order #{order.orderId}</span>
                  <span style={styles.date}>{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div style={styles.rightHead}>
                  <span style={{ ...styles.status, background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status], border: `1px solid ${STATUS_COLORS[order.status]}` }}>
                    {order.status}
                  </span>
                  <span style={styles.total}>₹{Number(order.totalAmount).toLocaleString('en-IN')}</span>
                  <span>{expandedOrder === order.orderId ? '▲' : '▼'}</span>
                </div>
              </div>

              {expandedOrder === order.orderId && (
                <div style={styles.cardBody}>
                  <p style={styles.addressLabel}>📍 {order.shippingAddress}</p>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.th}>
                        <td>Product</td><td>Qty</td><td>Price</td><td>Subtotal</td>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i} style={styles.tr}>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>₹{Number(item.priceAtPurchase).toLocaleString('en-IN')}</td>
                          <td>₹{Number(item.subtotal).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {order.status === 'PENDING' && (
                    <button style={styles.cancelBtn} onClick={() => handleCancel(order.orderId)}>
                      Cancel Order
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { maxWidth: '900px', margin: '0 auto', padding: '30px 20px' },
  title: { fontSize: '28px', fontWeight: 800, color: '#1B3A5C', marginBottom: '24px' },
  empty: { textAlign: 'center', padding: '60px', color: '#94a3b8', fontSize: '18px' },
  shopBtn: { background: '#2563EB', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', marginTop: '16px' },
  list: { display: 'flex', flexDirection: 'column', gap: '16px' },
  card: { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', cursor: 'pointer', flexWrap: 'wrap', gap: '10px' },
  orderId: { fontWeight: 800, color: '#1B3A5C', fontSize: '16px', marginRight: '12px' },
  date: { color: '#94a3b8', fontSize: '13px' },
  rightHead: { display: 'flex', alignItems: 'center', gap: '14px' },
  status: { padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 },
  total: { fontWeight: 800, fontSize: '16px', color: '#1B3A5C' },
  cardBody: { borderTop: '1px solid #f1f5f9', padding: '16px 20px' },
  addressLabel: { color: '#64748b', fontSize: '14px', marginBottom: '12px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  th: { background: '#f8fafc', fontWeight: 700, color: '#374151' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  cancelBtn: { background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, marginTop: '12px' },
};

export default Orders;
