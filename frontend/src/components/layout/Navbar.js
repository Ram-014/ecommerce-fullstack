import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ cartCount }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>🛍️ RamShop</Link>

        {/* Desktop Links */}
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/products" style={styles.link}>Products</Link>

          {user ? (
            <>
              <Link to="/cart" style={styles.cartBtn}>
                🛒 Cart {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
              </Link>
              <Link to="/orders" style={styles.link}>My Orders</Link>
              <span style={styles.username}>Hi, {user.name.split(' ')[0]}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: { background: '#1B3A5C', padding: '0 20px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.3)' },
  container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' },
  logo: { color: '#fff', textDecoration: 'none', fontSize: '22px', fontWeight: 'bold' },
  links: { display: 'flex', alignItems: 'center', gap: '18px' },
  link: { color: '#cbd5e1', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' },
  cartBtn: { color: '#fff', textDecoration: 'none', background: '#2563EB', padding: '6px 14px', borderRadius: '20px', fontSize: '14px', position: 'relative' },
  badge: { background: '#ef4444', color: '#fff', borderRadius: '50%', padding: '1px 6px', fontSize: '11px', marginLeft: '6px' },
  username: { color: '#93c5fd', fontSize: '14px' },
  logoutBtn: { background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  registerBtn: { background: '#2563EB', color: '#fff', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px' },
};

export default Navbar;
