import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCart, removeFromCart, placeOrder } from '../../api/api';
import Spinner from '../../components/common/Spinner';

const Cart = ({ onCartUpdate }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [placing, setPlacing] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (itemId, qty) => {
    try {
      const res = await updateCart(itemId, qty);
      setCart(res.data);
      if (onCartUpdate) onCartUpdate();
    } catch (err) { console.error(err); }
  };

  const handleRemove = async (itemId) => {
    try {
      const res = await removeFromCart(itemId);
      setCart(res.data);
      if (onCartUpdate) onCartUpdate();
    } catch (err) { console.error(err); }
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) { setMsg('❌ Please enter a shipping address'); return; }
    setPlacing(true);
    try {
      await placeOrder({ shippingAddress: address });
      setMsg('✅ Order placed successfully!');
      if (onCartUpdate) onCartUpdate();
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Order failed'));
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <Spinner />;

  const isEmpty = !cart?.items?.length;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 Your Cart</h1>

      {isEmpty ? (
        <div style={styles.empty}>
          <p style={{ fontSize: '64px' }}>🛒</p>
          <p>Your cart is empty!</p>
          <button style={styles.shopBtn} onClick={() => navigate('/products')}>Browse Products</button>
        </div>
      ) : (
        <div style={styles.layout}>
          {/* Cart Items */}
          <div style={styles.items}>
            {cart.items.map(item => (
              <div key={item.cartItemId} style={styles.item}>
                <img src={item.imageUrl || 'https://via.placeholder.com/80x80?text=P'} alt={item.productName} style={styles.img} />
                <div style={styles.itemInfo}>
                  <p style={styles.itemName}>{item.productName}</p>
                  <p style={styles.itemPrice}>₹{Number(item.price).toLocaleString('en-IN')} each</p>
                </div>
                <div style={styles.qtyControls}>
                  <button style={styles.qBtn} onClick={() => handleUpdate(item.cartItemId, item.quantity - 1)}>−</button>
                  <span style={styles.qty}>{item.quantity}</span>
                  <button style={styles.qBtn} onClick={() => handleUpdate(item.cartItemId, item.quantity + 1)}>+</button>
                </div>
                <p style={styles.subtotal}>₹{Number(item.subtotal).toLocaleString('en-IN')}</p>
                <button style={styles.removeBtn} onClick={() => handleRemove(item.cartItemId)}>🗑️</button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryRow}>
              <span>Items ({cart.items.length})</span>
              <span>₹{Number(cart.totalAmount).toLocaleString('en-IN')}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: '#16a34a' }}>FREE</span>
            </div>
            <div style={{ ...styles.summaryRow, fontWeight: 800, fontSize: '18px', borderTop: '2px solid #e2e8f0', paddingTop: '12px', marginTop: '8px' }}>
              <span>Total</span>
              <span>₹{Number(cart.totalAmount).toLocaleString('en-IN')}</span>
            </div>

            <label style={styles.label}>Shipping Address</label>
            <textarea value={address} onChange={e => setAddress(e.target.value)}
              placeholder="Enter your full delivery address..." style={styles.textarea} rows={3} />

            {msg && <p style={{ color: msg.startsWith('✅') ? '#16a34a' : '#dc2626', fontSize: '14px', fontWeight: 600 }}>{msg}</p>}

            <button style={styles.orderBtn} onClick={handlePlaceOrder} disabled={placing}>
              {placing ? 'Placing Order...' : '✅ Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' },
  title: { fontSize: '28px', fontWeight: 800, color: '#1B3A5C', marginBottom: '24px' },
  empty: { textAlign: 'center', padding: '60px', color: '#94a3b8', fontSize: '18px' },
  shopBtn: { background: '#2563EB', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', marginTop: '16px' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' },
  items: { display: 'flex', flexDirection: 'column', gap: '16px' },
  item: { display: 'flex', alignItems: 'center', gap: '16px', background: '#fff', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  img: { width: '72px', height: '72px', objectFit: 'cover', borderRadius: '8px' },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: 700, color: '#1e293b', margin: '0 0 4px', fontSize: '15px' },
  itemPrice: { color: '#64748b', fontSize: '13px', margin: 0 },
  qtyControls: { display: 'flex', alignItems: 'center', gap: '10px' },
  qBtn: { width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #d1d5db', background: '#f8fafc', fontSize: '16px', cursor: 'pointer', fontWeight: 700 },
  qty: { fontSize: '16px', fontWeight: 700, minWidth: '20px', textAlign: 'center' },
  subtotal: { fontWeight: 800, color: '#1B3A5C', fontSize: '16px', minWidth: '80px', textAlign: 'right' },
  removeBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' },
  summary: { background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', position: 'sticky', top: '80px' },
  summaryTitle: { fontSize: '20px', fontWeight: 800, color: '#1B3A5C', marginBottom: '20px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '15px', color: '#374151' },
  label: { display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', margin: '16px 0 6px' },
  textarea: { width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' },
  orderBtn: { width: '100%', background: '#16a34a', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', marginTop: '12px' },
};

export default Cart;
