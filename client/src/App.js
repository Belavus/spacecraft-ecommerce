import React from 'react';
import {Routes, Route} from 'react-router-dom';
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
import {CartProvider} from './contexts/CartContext';
import {UserProvider} from './contexts/UserContext';
import {ProductProvider} from './contexts/ProductContext';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './App.css'

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <ProductProvider>
                    <CartProvider>
                        <CssBaseline/>
                        <Header/>
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/product/:id" element={<ProductPage/>}/>
                            <Route path="/cart" element={<PrivateRoute><CartPage/></PrivateRoute>}/>
                            <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/admin" element={<AdminRoute><AdminPage/></AdminRoute>}/>
                            <Route path="/products" element={<AllProductsPage/>}/>
                        </Routes>
                    </CartProvider>
                </ProductProvider>
            </UserProvider>
        </ThemeProvider>

    );
};

export default App;
