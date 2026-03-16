import React, { useState, useEffect } from 'react';
import { getProducts, getByCategory, searchProducts, addToCart } from '../../api/api';
import ProductCard from '../../components/common/ProductCard';
import Spinner from '../../components/common/Spinner';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Footwear', 'Books'];

const Products = ({ onCartUpdate }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState('');

  useEffect(() => { fetchProducts(); }, [activeCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let res;
      if (activeCategory !== 'All') {
        res = await getByCategory(activeCategory);
      } else {
        res = await getProducts();
      }
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return fetchProducts();
    setLoading(true);
    try {
      const res = await searchProducts(search);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) { navigate('/login'); return; }
    try {
      await addToCart({ productId, quantity: 1 });
      showToast('✅ Added to cart!');
      if (onCartUpdate) onCartUpdate();
    } catch (err) {
      showToast('❌ ' + (err.response?.data?.message || 'Failed to add'));
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div style={styles.page}>
      {toast && <div style={styles.toast}>{toast}</div>}

      <div style={styles.header}>
        <h1 style={styles.title}>Our Products</h1>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products..." style={styles.searchInput} />
          <button type="submit" style={styles.searchBtn}>🔍</button>
        </form>
      </div>

      {/* Category Filters */}
      <div style={styles.categories}>
        {CATEGORIES.map(cat => (
          <button key={cat}
            style={{ ...styles.catBtn, ...(activeCategory === cat ? styles.catActive : {}) }}
            onClick={() => { setActiveCategory(cat); setSearch(''); }}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? <Spinner /> : (
        <>
          <p style={styles.count}>{products.length} products found</p>
          <div style={styles.grid}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
          {products.length === 0 && (
            <div style={styles.empty}>No products found. Try a different search!</div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' },
  title: { fontSize: '28px', fontWeight: 800, color: '#1B3A5C', margin: 0 },
  searchForm: { display: 'flex', gap: '8px' },
  searchInput: { padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', width: '260px', outline: 'none' },
  searchBtn: { background: '#2563EB', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
  categories: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' },
  catBtn: { padding: '7px 18px', borderRadius: '20px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#374151' },
  catActive: { background: '#1B3A5C', color: '#fff', border: '1px solid #1B3A5C' },
  count: { color: '#64748b', fontSize: '14px', marginBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' },
  empty: { textAlign: 'center', color: '#94a3b8', padding: '60px', fontSize: '18px' },
  toast: { position: 'fixed', bottom: '30px', right: '30px', background: '#1B3A5C', color: '#fff', padding: '12px 24px', borderRadius: '10px', fontSize: '15px', zIndex: 999, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' },
};

export default Products;
