import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/ApiService';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await apiService.getOrders();
            setOrders(res.data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const placeOrder = async () => {
        try {
            await apiService.placeOrder();
            await fetchOrders();
            alert('Order placed successfully');
        } catch (error) {
            console.error('Failed to place order', error);
            alert('Failed to place order');
        }
    };

    return (
        <OrderContext.Provider value={{ orders, loadingOrders, placeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContext, OrderProvider };
