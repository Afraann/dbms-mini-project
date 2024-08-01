import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="layout-container flex flex-col min-h-screen">
      <header className="bg-brown-700 text-beige-100 p-4 flex justify-between items-center">
      <div className="header-left">
          <Link to="/mainpage">
            <img src="logo.jpeg" alt="Ecommerce Logo" className="logo h-12 w-auto" /> 
          </Link>
        </div>
        <div className="header-center">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-bar px-4 py-2 border rounded-md" 
          />
        </div>
        <div className="header-right flex items-center space-x-4"> 
          <Link to="/account">
            <img src="account-icon.png" alt="Account" className="icon h-8 w-8" />
          </Link>
          <Link to="/cart">
          <img src="/cart-icon.png" alt="Cart" className="icon h-8 w-8" /> 
          </Link>
        </div>
      </header>

      <main className="body flex-grow">
        {children}
      </main>

      <footer className="bg-brown-700 text-beige-100 p-4 text-center">
        <p>Footer Content Here</p>
      </footer>
    </div>
  );
}

export default Layout;
