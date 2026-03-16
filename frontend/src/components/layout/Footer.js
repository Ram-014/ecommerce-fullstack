import React from 'react';

const Footer = () => (
  <footer style={styles.footer}>
    <p style={styles.text}>© 2024 RamShop — Built with Spring Boot + React.js by Ramakrishnan Aadhali</p>
    <p style={styles.sub}>Java Full Stack Developer | <a href="https://github.com/Ram-014" style={styles.link} target="_blank" rel="noreferrer">GitHub</a></p>
  </footer>
);

const styles = {
  footer: { background: '#0D2B4E', color: '#94a3b8', textAlign: 'center', padding: '20px', marginTop: '40px' },
  text: { margin: '0 0 6px', fontSize: '14px' },
  sub: { margin: 0, fontSize: '13px' },
  link: { color: '#60a5fa', textDecoration: 'none' },
};

export default Footer;
