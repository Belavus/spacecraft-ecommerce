import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/ApiService';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        try {
            const res = await apiService.getCart();
            setCart(res.data);
        } catch (error) {
            console.error('Failed to fetch cart', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const addToCart = async (productId) => {
        try {
            await apiService.addToCart({ productId, quantity: 1 });
            await fetchCart();  // обновить состояние корзины после добавления товара
        } catch (error) {
            console.error('Failed to add to cart', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await apiService.deleteCartItem(productId);
            await fetchCart();  // refresh cart
        } catch (error) {
            console.error('Failed to remove from cart', error);
        }
    };

    const updateCart = async () => {
        await fetchCart();
    };

    const cartItemCount = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
