// src/main.jsx (RE-ADDED CART PROVIDER)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './store/AuthContext.jsx'; 
import { CartProvider } from './store/CartContext.jsx'; // <--- Re-added
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider> {/* <--- Re-added */}
          <App />
        </CartProvider> {/* <--- Re-added */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);