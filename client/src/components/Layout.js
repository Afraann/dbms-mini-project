// client/src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Layout.css'; // Import the CSS file for styling

function Layout({ children }) {
  return (
    <div className="layout-container">
      <header className="header">
        <div className="header-left">
          <Link to="/mainpage"><img src="../images/ProjectLogo.png" alt="Ecommerce Logo" className="logo" /></Link>
        </div>
        <div className="header-center">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>
        <div className="header-right">
          <Link to="/account"><img src="../images/account-icon.png" alt="Account" className="icon" /></Link>
          <Link to="/cart"><img src="../images/cart-icon.png" alt="Cart" className="icon" /></Link>
        </div>
      </header>
      <main className="body">
        {children}
      </main>
      <footer className="footer">
        <p>Footer Content Here</p>
      </footer>
    </div>
  );
}

export default Layout;
