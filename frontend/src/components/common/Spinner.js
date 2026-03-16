import React from 'react';

const Spinner = () => (
  <div style={styles.wrapper}>
    <div style={styles.spinner}></div>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
  </div>
);

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px' },
  spinner: {
    width: '48px', height: '48px',
    border: '5px solid #e2e8f0',
    borderTop: '5px solid #2563EB',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

export default Spinner;
