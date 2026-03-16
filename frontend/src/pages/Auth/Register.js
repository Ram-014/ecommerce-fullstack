import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await registerUser(form);
      login(res.data);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.email || err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.sub}>Join RamShop and start shopping</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Full Name</label>
          <input name="name" type="text" placeholder="Ramakrishnan" value={form.name}
            onChange={handleChange} style={styles.input} required />
          <label style={styles.label}>Email</label>
          <input name="email" type="email" placeholder="you@example.com" value={form.email}
            onChange={handleChange} style={styles.input} required />
          <label style={styles.label}>Password</label>
          <input name="password" type="password" placeholder="Min. 6 characters" value={form.password}
            onChange={handleChange} style={styles.input} required minLength={6} />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  card: { background: '#fff', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' },
  title: { fontSize: '26px', fontWeight: 800, color: '#1B3A5C', margin: '0 0 6px' },
  sub: { color: '#64748b', fontSize: '14px', margin: '0 0 24px' },
  error: { background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', marginBottom: '16px', boxSizing: 'border-box' },
  btn: { width: '100%', background: '#2563EB', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' },
  footer: { textAlign: 'center', fontSize: '14px', marginTop: '20px', color: '#64748b' },
  link: { color: '#2563EB', textDecoration: 'none', fontWeight: 600 },
};

export default Register;
