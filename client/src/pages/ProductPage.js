import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import VideoPlayer from '../components/VideoPlayer';
import { useEffect, useState } from 'react';
import apiService from '../services/ApiService';
import { Container, Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';


const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

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
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductPage;

