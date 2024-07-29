import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import AllProductsPage from './pages/AllProductsPage';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
                <Route path="/products" element={<AllProductsPage />} />
            </Routes>
        </div>
    );
};

export default App;
