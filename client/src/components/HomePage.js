import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';  // Import CSS file

const HomePage = () => {
  return (
    <div>
      <header>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </header>
      <main>
        <h1>Welcome to Our E-commerce Website</h1>
        <p>Information about the e-commerce website.</p>
      </main>
    </div>
  );
};

export default HomePage;
