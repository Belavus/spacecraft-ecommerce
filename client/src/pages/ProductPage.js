import React, {useEffect, useState, useContext} from 'react';
import {useParams} from 'react-router-dom';
import apiService from '../services/ApiService';
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
    Button,
    Box,
    Modal,
    Rating,
    IconButton
} from '@mui/material';
import {CartContext} from '../contexts/CartContext';
import PageContainer from "../components/PageContainer/PageContainer";

const ProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const {addToCart} = useContext(CartContext);
    const [userRating, setUserRating] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

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
            await addToCart(product._id);
            alert('Product added to cart');
        } catch (error) {
            console.error('Failed to add product to cart', error);
            alert('Failed to add product to cart');
        }
    };

    const handleRatingChange = async (newValue) => {
        setUserRating(newValue);
        try {
            await apiService.updateProductRating(id, newValue);
            const res = await apiService.getProductById(id);
            setProduct(res.data);
            setModalOpen(false); // Закрываем модальное окно после голосования
        } catch (error) {
            console.error('Failed to update rating', error);
        }
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    if (loading) {
        return <CircularProgress/>;
    }

    if (!product) {
        return <Typography variant="h5">Product not found</Typography>;
    }

    return (
        <PageContainer>
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
                        <Box onClick={handleOpenModal}
                             sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Rating
                                name="product-rating"
                                value={product.rating}
                                onClick={handleOpenModal}
                                precision={0.5}
                                readOnly
                            />
                            <Typography paddingX="5px">
                                {product.rating}
                            </Typography>
                        </Box>

                        <Typography variant="body1" color="textSecondary">
                            {product.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Engine Count: {product.engineCount}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Engine Type: {product.engineType}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Purpose: {product.purpose}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {product.orderCount} sold
                        </Typography>
                        <Typography variant="h6" color="textPrimary" style={{marginTop: '16px'}}>
                            Price: ${product.price}
                        </Typography>
                        {product.videoUrl && (
                            <div style={{marginTop: '16px'}}>
                                <Typography variant="h6" color="textPrimary">
                                    Product Video
                                </Typography>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${product.videoUrl}`}
                                    title={product.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                        <Button variant="contained" color="primary" onClick={handleAddToCart}
                                style={{marginTop: '16px'}}>
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>

                {/* Modal for rating */}
                <Modal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="rating-modal-title"
                    aria-describedby="rating-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography id="rating-modal-title" variant="h6" component="h2" gutterBottom>
                            Rate this product
                        </Typography>
                        <Rating
                            name="user-rating"
                            value={userRating}
                            onChange={(event, newValue) => handleRatingChange(newValue)}
                            precision={0.5}
                        />
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 2}}>
                            <Button onClick={handleCloseModal} color="secondary">
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </PageContainer>
    );
};

export default ProductPage;
