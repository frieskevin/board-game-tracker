import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


const Footer = () => {
  return (
    <footer className="fixed-bottom" id="main-footer">
      <div className="text-center footer-div">
        &copy;{new Date().getFullYear()} by David, Kevin, Lauren, Rachel
        </div>
    </footer>
  );
};

export default Footer;