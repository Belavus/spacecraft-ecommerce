import React, {createContext, useState, useEffect, useContext} from 'react';
import apiService from '../services/ApiService';
import {UserContext} from './UserContext';

const CartContext = createContext();

const CartProvider = ({children}) => {
    const {user} = useContext(UserContext); // Доступ к текущему пользователю
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        if (user) {
            try {
                const res = await apiService.getCart();
                setCart(res.data);
            } catch (error) {
                console.error('Failed to fetch cart', error);
                setCart(null);
            }
        } else {
            setCart(null);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    const updateCartQuantity = async (productId, quantity) => {
        try {
            const updatedItems = cart.items.map(item =>
                item.product._id === productId ? {...item, quantity} : item
            );

            await apiService.updateCart({items: updatedItems});
            await fetchCart();
        } catch (error) {
            console.error('Failed to update cart quantity', error);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            await apiService.addToCart({productId, quantity});
            await fetchCart();
        } catch (error) {
            console.error('Failed to add to cart', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await apiService.deleteCartItem(productId);
            await fetchCart();
        } catch (error) {
            console.error('Failed to remove from cart', error);
        }
    };

    const updateCart = async () => {
        await fetchCart();
    };

    const cartItemCount = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

    return (
        <CartContext.Provider value={{cart, updateCartQuantity, addToCart, removeFromCart, updateCart, cartItemCount}}>
            {children}
        </CartContext.Provider>
    );
};

export {CartContext, CartProvider};