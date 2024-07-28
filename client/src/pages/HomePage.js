import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ProductContext } from '../contexts/ProductContext';
import CanvasComponent from '../components/CanvasComponent';
import Chat from '../components/Chat';
import Statistics from '../components/Statistics';
import {Grid} from "@mui/material";

const HomePage = () => {
    const { user } = useContext(UserContext);
    const { products, loading, error } = useContext(ProductContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }
    }, [user]);

    // Пример данных для статистики
    const statsData = products.map(product => ({
        name: product.name,
        value: Math.floor(Math.random() * 100)
    }));

    return (
        <div>
            <h1>Home Page</h1>
            {isAuthenticated ? (
                <div>
                    <p>Welcome, {user ? user.name : 'User'}!</p>
                    <h2>Products</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="product-list">
                            {products.map((product) => (
                                <div key={product._id} className="product-item">
                                    {product.name}
                                </div>
                            ))}
                        </div>
                    )}
                    <CanvasComponent />
                    <Chat />
                    <Statistics data={statsData} />
                </div>
            ) : (
                <p>Please log in to see the content.</p>
            )}
        </div>
    );
};

export default HomePage;