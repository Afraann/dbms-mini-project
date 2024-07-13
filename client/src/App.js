// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MainPage from './components/MainPage';
import AccountPage from './components/AccountPage';
import CartPage from './components/CartPage';
import ItemPage from './components/ItemPage';
import Layout from './components/Layout';

// A component to conditionally wrap routes with Layout
function LayoutWrapper({ children }) {
  const location = useLocation();
  const noHeaderFooterRoutes = ['/', '/login', '/register'];
  const showLayout = !noHeaderFooterRoutes.includes(location.pathname);
  
  return showLayout ? <Layout>{children}</Layout> : <>{children}</>;
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
