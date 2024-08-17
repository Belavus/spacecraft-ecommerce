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
import Header from './components/Header/Header';
import Footer from "./components/Footer";
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import { UserProvider } from './contexts/UserContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from "./contexts/OrderContext";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./theme/theme";
import { Box } from '@mui/material';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <UserProvider>
                    <OrderProvider>
                        <ProductProvider>
                            <CartProvider>
                                <Header />
                                <Box sx={{ flex: 1 }}>
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
                                </Box>
                                <Footer />
                            </CartProvider>
                        </ProductProvider>
                    </OrderProvider>
                </UserProvider>
            </Box>
        </ThemeProvider>
    );
};

export default App;
