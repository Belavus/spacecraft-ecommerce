import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ProductContext } from '../contexts/ProductContext';
import CanvasComponent from '../components/CanvasComponent';
import Chat from '../components/Chat';
import Statistics from '../components/Statistics';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography } from '@mui/material';

const HomePage = () => {
    const { user } = useContext(UserContext);
    const { products, loading, error } = useContext(ProductContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

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

    // Получение последних трех добавленных продуктов
    const latestProducts = products.slice(-3);

    return (
        <div>
            <h1>Home Page</h1>
            <Button variant="contained" color="primary" onClick={()=>{navigate('/products')}}>
                Products
            </Button>
            <Button variant="contained" color="primary" onClick={()=>{navigate('/admin')}}>
                Admin
            </Button>
            {isAuthenticated ? (
                <div>
                    <p>Welcome, {user ? user.name : 'User'}!</p>
                    <h2>Latest Products</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <Carousel interval={5000}>
                            {latestProducts.map((product) => (
                                <Paper key={product._id}>
                                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                                    <Typography variant="h6" align="center" style={{ marginTop: '10px' }}>
                                        {product.name}
                                    </Typography>
                                </Paper>
                            ))}
                        </Carousel>
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
