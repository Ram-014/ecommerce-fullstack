import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <img
        src={product.imageUrl || 'https://via.placeholder.com/300x200?text=Product'}
        alt={product.name}
        style={styles.img}
        onClick={() => navigate(`/products/${product.id}`)}
      />
      <div style={styles.body}>
        <span style={styles.category}>{product.category}</span>
        <h3 style={styles.name} onClick={() => navigate(`/products/${product.id}`)}>{product.name}</h3>
        <p style={styles.desc}>{product.description?.substring(0, 60)}...</p>
        <div style={styles.footer}>
          <span style={styles.price}>₹{Number(product.price).toLocaleString('en-IN')}</span>
          <span style={{ ...styles.stock, color: product.stock > 0 ? '#16a34a' : '#dc2626' }}>
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </span>
        </div>
        <button
          style={{ ...styles.btn, opacity: product.stock === 0 ? 0.5 : 1 }}
          disabled={product.stock === 0}
          onClick={() => onAddToCart(product.id)}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: { background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' },
  img: { width: '100%', height: '200px', objectFit: 'cover' },
  body: { padding: '16px' },
  category: { background: '#dbeafe', color: '#1d4ed8', fontSize: '11px', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 },
  name: { fontSize: '16px', fontWeight: 700, margin: '8px 0 4px', color: '#1e293b' },
  desc: { fontSize: '13px', color: '#64748b', margin: '0 0 10px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  price: { fontSize: '18px', fontWeight: 800, color: '#1B3A5C' },
  stock: { fontSize: '12px', fontWeight: 600 },
  btn: { width: '100%', background: '#2563EB', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' },
};

export default ProductCard;
