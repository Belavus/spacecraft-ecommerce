import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/ApiService';
import { Container, Card, CardContent, CardMedia, Typography, CircularProgress, Button } from '@mui/material';
import { CartContext } from '../contexts/CartContext';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext); // Используем CartContext для добавления товаров в корзину

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await apiService.getProductById(id);
                setProduct(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await addToCart(product._id); // Добавляем товар в корзину через CartContext
            alert('Product added to cart');
        } catch (error) {
            console.error('Failed to add product to cart', error);
            alert('Failed to add product to cart');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!product) {
        return <Typography variant="h5">Product not found</Typography>;
    }

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.imageUrl}
                    alt={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {product.description}
                    </Typography>
                    <Typography variant="h6" color="textPrimary" style={{ marginTop: '16px' }}>
                        Price: ${product.price}
                    </Typography>
                    {product.videoUrl && (
                        <div style={{ marginTop: '16px' }}>
                            <Typography variant="h6" color="textPrimary">
                                Product Video
                            </Typography>
                            <video width="100%" controls>
                                <source src={product.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                    <Button variant="contained" color="primary" onClick={handleAddToCart} style={{ marginTop: '16px' }}>
                        Add to Cart
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductPage;
