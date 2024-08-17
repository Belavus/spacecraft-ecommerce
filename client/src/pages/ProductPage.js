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
    Stack
} from '@mui/material';
import {CartContext} from '../contexts/CartContext';
import PageContainer from "../components/PageContainer/PageContainer";
import {formatNumberWithCommas} from "../utils/utils";

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
                    <Box sx={{overflow: 'hidden', position: 'relative'}}>
                        <CardMedia
                            component="img"
                            sx={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.5)',
                                },
                            }}
                            image={product.imageUrl}
                            alt={product.name}
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {product.name}
                        </Typography>

                        <Stack spacing={2}>
                            <Stack onClick={handleOpenModal} sx={{cursor: 'pointer'}} direction="row" spacing={1}
                                   alignItems="center">
                                <Rating
                                    name="product-rating"
                                    value={product.rating}
                                    precision={0.5}
                                    readOnly
                                />
                                <Typography variant="body2">
                                    ({product.orderCount} sold)
                                </Typography>
                            </Stack>
                            <Typography variant="body2">
                                {product.description}
                            </Typography>
                            <Typography variant="body2">
                                <span style={{fontWeight: 'bold'}}>Engine Count:</span> {product.engineCount}
                            </Typography>
                            <Typography variant="body2">
                                <span style={{fontWeight: 'bold'}}>Engine Type:</span> {product.engineType}
                            </Typography>
                            <Typography variant="body2">
                                <span style={{fontWeight: 'bold'}}>Purpose:</span> {product.purpose}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end" sx={{mt: 2}}>
                            <Stack spacing={1} justifyContent="flex-end" alignItems={"flex-end"}>
                                <Typography variant="h6" color="textPrimary" lineHeight={1}>
                                    {formatNumberWithCommas(product.price)} $
                                </Typography>
                                <Button onClick={handleAddToCart} sx={{mt: 1}}>
                                    Add to Cart
                                </Button>
                            </Stack>
                        </Stack>

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
