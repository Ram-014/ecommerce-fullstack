import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { getCart } from './api/api';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/Products/ProductDetail';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    if (!user) { setCartCount(0); return; }
    try {
      const res = await getCart();
      setCartCount(res.data.items?.length || 0);
    } catch { setCartCount(0); }
  };

  useEffect(() => { updateCartCount(); }, [user]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <Navbar cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products onCartUpdate={updateCartCount} />} />
          <Route path="/products/:id" element={<ProductDetail onCartUpdate={updateCartCount} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<PrivateRoute><Cart onCartUpdate={updateCartCount} /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
