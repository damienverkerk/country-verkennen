import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className='footer-copyright'>&copy; {currentYear} ReisApp. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
};

export default Footer;
