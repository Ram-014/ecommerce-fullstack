import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to RamShop 🛍️</h1>
          <p style={styles.heroSub}>Discover thousands of products at the best prices. Fast delivery, easy returns.</p>
          <div style={styles.heroBtns}>
            <button style={styles.heroBtn} onClick={() => navigate('/products')}>Shop Now →</button>
            {!user && <button style={styles.heroBtn2} onClick={() => navigate('/register')}>Create Account</button>}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={styles.features}>
        {[
          { icon: '🚚', title: 'Free Delivery', desc: 'On all orders above ₹499' },
          { icon: '🔒', title: 'Secure Payment', desc: 'JWT-secured checkout process' },
          { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns' },
          { icon: '💬', title: '24/7 Support', desc: 'Always here to help you' },
        ].map(f => (
          <div key={f.title} style={styles.featureCard}>
            <span style={styles.featureIcon}>{f.icon}</span>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <div style={styles.catGrid}>
          {[
            { name: 'Electronics', icon: '📱', color: '#dbeafe' },
            { name: 'Clothing', icon: '👕', color: '#dcfce7' },
            { name: 'Footwear', icon: '👟', color: '#fef9c3' },
            { name: 'Books', icon: '📚', color: '#fce7f3' },
          ].map(c => (
            <div key={c.name} style={{ ...styles.catCard, background: c.color }}
              onClick={() => navigate(`/products?category=${c.name}`)}>
              <span style={{ fontSize: '40px' }}>{c.icon}</span>
              <p style={styles.catName}>{c.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div style={styles.cta}>
          <h2 style={styles.ctaTitle}>Ready to start shopping?</h2>
          <p style={styles.ctaSub}>Create a free account and enjoy exclusive member benefits.</p>
          <button style={styles.ctaBtn} onClick={() => navigate('/register')}>Get Started — It's Free</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  hero: { background: 'linear-gradient(135deg, #0D2B4E 0%, #1558A8 100%)', color: '#fff', padding: '80px 20px', textAlign: 'center' },
  heroContent: { maxWidth: '700px', margin: '0 auto' },
  heroTitle: { fontSize: '48px', fontWeight: 900, margin: '0 0 16px' },
  heroSub: { fontSize: '20px', color: '#bfdbfe', margin: '0 0 32px' },
  heroBtns: { display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' },
  heroBtn: { background: '#fff', color: '#1B3A5C', border: 'none', padding: '14px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' },
  heroBtn2: { background: 'transparent', color: '#fff', border: '2px solid #fff', padding: '14px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' },
  features: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '40px auto', padding: '0 20px' },
  featureCard: { background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  featureIcon: { fontSize: '36px' },
  featureTitle: { fontWeight: 700, color: '#1B3A5C', margin: '10px 0 6px' },
  featureDesc: { color: '#64748b', fontSize: '14px', margin: 0 },
  section: { maxWidth: '1200px', margin: '0 auto', padding: '20px 20px 40px' },
  sectionTitle: { fontSize: '26px', fontWeight: 800, color: '#1B3A5C', marginBottom: '20px' },
  catGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' },
  catCard: { padding: '30px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' },
  catName: { fontWeight: 700, fontSize: '16px', color: '#1B3A5C', margin: '10px 0 0' },
  cta: { background: '#f0f9ff', textAlign: 'center', padding: '60px 20px' },
  ctaTitle: { fontSize: '30px', fontWeight: 800, color: '#1B3A5C' },
  ctaSub: { color: '#64748b', fontSize: '16px', margin: '10px 0 24px' },
  ctaBtn: { background: '#2563EB', color: '#fff', border: 'none', padding: '14px 36px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' },
};

export default Home;
