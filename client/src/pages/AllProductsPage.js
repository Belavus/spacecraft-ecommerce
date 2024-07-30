import React, { useEffect, useState, useContext } from 'react';
import apiService from '../services/ApiService';
import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../contexts/CartContext';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiService.getProducts();
                setProducts(res.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, []);

    const handleViewProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                All Products
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <ProductCard
                            product={product}
                            onView={handleViewProduct}
                            onAddToCart={addToCart}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AllProductsPage;
