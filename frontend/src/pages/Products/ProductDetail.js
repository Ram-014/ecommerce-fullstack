import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addToCart } from '../../api/api';
import Spinner from '../../components/common/Spinner';
import { useAuth } from '../../context/AuthContext';

const ProductDetail = ({ onCartUpdate }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getProductById(id).then(r => setProduct(r.data)).catch(() => navigate('/products')).finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await addToCart({ productId: product.id, quantity });
      setMsg('✅ Added to cart successfully!');
      if (onCartUpdate) onCartUpdate();
      setTimeout(() => setMsg(''), 2500);
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Error adding to cart'));
    }
  };

  if (loading) return <Spinner />;
  if (!product) return null;

  return (
    <div style={styles.page}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Back</button>
      <div style={styles.card}>
        <img src={product.imageUrl || 'https://via.placeholder.com/400x300?text=Product'} alt={product.name} style={styles.img} />
        <div style={styles.info}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.desc}>{product.description}</p>
          <p style={styles.price}>₹{Number(product.price).toLocaleString('en-IN')}</p>
          <p style={{ color: product.stock > 0 ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
            {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
          </p>

          {product.stock > 0 && (
            <div style={styles.qtyRow}>
              <label style={styles.label}>Quantity:</label>
              <div style={styles.qtyControls}>
                <button style={styles.qtyBtn} onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span style={styles.qtyNum}>{quantity}</span>
                <button style={styles.qtyBtn} onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </div>
          )}

          {msg && <div style={{ color: msg.startsWith('✅') ? '#16a34a' : '#dc2626', margin: '10px 0', fontWeight: 600 }}>{msg}</div>}

          <button style={{ ...styles.btn, opacity: product.stock === 0 ? 0.5 : 1 }}
            disabled={product.stock === 0} onClick={handleAdd}>
            🛒 Add to Cart
          </button>
          <button style={styles.cartLink} onClick={() => navigate('/cart')}>View Cart →</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' },
  back: { background: 'none', border: 'none', color: '#2563EB', fontSize: '15px', cursor: 'pointer', marginBottom: '20px', fontWeight: 600 },
  card: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  img: { width: '100%', borderRadius: '12px', objectFit: 'cover', maxHeight: '380px' },
  info: { display: 'flex', flexDirection: 'column', gap: '8px' },
  category: { background: '#dbeafe', color: '#1d4ed8', fontSize: '12px', padding: '3px 10px', borderRadius: '20px', width: 'fit-content', fontWeight: 600 },
  name: { fontSize: '26px', fontWeight: 800, color: '#1B3A5C', margin: '4px 0' },
  desc: { color: '#64748b', fontSize: '15px', lineHeight: 1.6 },
  price: { fontSize: '32px', fontWeight: 900, color: '#1B3A5C' },
  label: { fontWeight: 600, fontSize: '14px', color: '#374151' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0' },
  qtyControls: { display: 'flex', alignItems: 'center', gap: '12px' },
  qtyBtn: { width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #d1d5db', background: '#f8fafc', fontSize: '18px', cursor: 'pointer', fontWeight: 700 },
  qtyNum: { fontSize: '18px', fontWeight: 700, minWidth: '24px', textAlign: 'center' },
  btn: { background: '#2563EB', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', marginTop: '10px' },
  cartLink: { background: 'none', border: 'none', color: '#2563EB', fontSize: '15px', cursor: 'pointer', fontWeight: 600, textAlign: 'left' },
};

export default ProductDetail;
