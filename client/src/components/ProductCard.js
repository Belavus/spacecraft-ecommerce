import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, Tooltip, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';

const ProductCard = ({ product, onView, onAddToCart }) => {
    return (
        <Card sx={{ width: 300, boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
                component="img"
                sx={{ height: 180, objectFit: 'cover' }}
                image={product.imageUrl}
                alt={product.name}
            />
            <CardContent sx={{ padding: 2, flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                    {product.name}
                </Typography>
                <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
                <Tooltip title={product.description} arrow placement="top">
                    <Typography
                        variant="body2"
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 3,
                            cursor: 'pointer',
                        }}
                    >
                        {product.description}
                    </Typography>
                </Tooltip>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        <span style={{ fontWeight: 'bold' }}>Engine Count:</span> {product.engineCount}
                    </Typography>
                    <Typography variant="body2">
                        <span style={{ fontWeight: 'bold' }}>Engine Type:</span> {product.engineType}
                    </Typography>
                    <Typography variant="body2">
                        <span style={{ fontWeight: 'bold' }}>Purpose:</span> {product.purpose}
                    </Typography>
                </Stack>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    ${product.price}
                </Typography>
                <Typography variant="body2">
                    {product.orderCount} sold
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                {onView && (
                    <Button sx={{ boxShadow: 2, margin: 0 }} size="small" onClick={() => onView(product._id)}>
                        View
                    </Button>
                )}
                {onAddToCart && (
                    <Button sx={{ boxShadow: 2, margin: 0 }} size="small" onClick={() => onAddToCart(product._id)}>
                        Add to Cart
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ProductCard;
