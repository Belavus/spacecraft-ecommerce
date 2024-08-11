import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../contexts/UserContext';
import {ProductContext} from '../contexts/ProductContext';
import CanvasComponent from '../components/CanvasComponent';
import Chat from '../components/Chat';
import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import Carousel from 'react-material-ui-carousel';
import {Paper, Typography, Grid} from '@mui/material';
import apiService from '../services/ApiService';
import ProductCard from "../components/ProductCard";
import {CartContext} from "../contexts/CartContext";

const HomePage = () => {
    const {user} = useContext(UserContext);
    const {products, loading, error} = useContext(ProductContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [homePageInfo, setHomePageInfo] = useState({carouselImages: [], welcomeText: ''});
    const navigate = useNavigate();
    const {addToCart} = useContext(CartContext);

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

    useEffect(() => {
        const fetchHomePageInfo = async () => {
            try {
                const res = await apiService.getHomePageInfo();
                setHomePageInfo(res.data);
            } catch (error) {
                console.error('Failed to fetch home page info', error);
            }
        };

        fetchHomePageInfo();
    }, []);

    const latestProducts = products.slice(-4);// 4 newest products

    return (
        <div>
            {isAuthenticated ? (
                <div>

                    <Carousel interval={5000}>
                        {homePageInfo.carouselImages.map((image, index) => (
                            <Paper key={index}>
                                <img src={image} alt={`Carousel ${index}`}
                                     style={{width: '100%', height: '300px', objectFit: 'cover'}}/>
                            </Paper>
                        ))}
                    </Carousel>
                    <Typography variant="h6" align="center">
                        {homePageInfo.welcomeText}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <Button variant="contained" onClick={() => {
                            navigate('/products')
                        }}>
                            Browse Products
                        </Button>
                    </div>

                    <Typography variant="h1">New Arrival</Typography>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <Grid container spacing={3}>
                            {latestProducts.map((product) => (
                                <Grid item key={product._id} xs={12} sm={6} md={3}>
                                    <ProductCard
                                        product={product}
                                        onView={(id) => navigate(`/product/${id}`)}
                                        onAddToCart={addToCart}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    <CanvasComponent/>
                    <Chat/>
                </div>
            ) : (
                <p>Please log in to see the content.</p>
            )}
        </div>
    );
};

export default HomePage;