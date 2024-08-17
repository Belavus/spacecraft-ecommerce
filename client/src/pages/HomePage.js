import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../contexts/UserContext';
import {ProductContext} from '../contexts/ProductContext';
import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import PageContainer from '../components/PageContainer/PageContainer';
import Footer from '../components/Footer';
import {CartContext} from "../contexts/CartContext";
import apiService from "../services/ApiService";
import {Box, Stack, Typography} from "@mui/material";
import CarouselWithOverlay from "../components/CarouselWithOverlay/CarouselWithOverlay";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import theme from "../theme/theme";

const HomePage = () => {
    const {user} = useContext(UserContext);
    const {products, loading, error, fetchProducts} = useContext(ProductContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [homePageInfo, setHomePageInfo] = useState({carouselImages: [], welcomeText: ''});
    const navigate = useNavigate();
    const {addToCart} = useContext(CartContext);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
        } else {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
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
        fetchProducts();
    }, []);

    const latestProducts = products.slice(-4); // 4 newest products

    return (
        <div>
            <CarouselWithOverlay images={homePageInfo.carouselImages} welcomeText={homePageInfo.welcomeText}/>
            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
                <Button variant="contained" onClick={() => navigate('/products')}>
                    Browse Products
                </Button>
            </Box>
            <Box sx={{backgroundColor: theme.palette.background.light}}>
                <PageContainer withHeaderOffset={false}>
                    <Stack padding={3} spacing={1} alignItems={'center'}>
                        <Typography variant="h1">New Arrival</Typography>
                        <ProductGrid
                            products={latestProducts}
                            loading={loading}
                            error={error}
                            onView={(id) => navigate(`/product/${id}`)}
                            onAddToCart={addToCart}
                        />

                    </Stack>
                </PageContainer>
            </Box>
        </div>
    );
};

export default HomePage;
