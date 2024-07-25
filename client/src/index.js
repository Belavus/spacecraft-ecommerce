import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import App from './App';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <ProductProvider>
            <CartProvider>
                <Router>
                    <App />
                </Router>
            </CartProvider>
        </ProductProvider>
    </UserProvider>
);
