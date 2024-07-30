import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

const ProductCard = ({ product, onView, onAddToCart }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.orderCount} sold
                </Typography>
            </CardContent>
            <CardActions>
                {onView && (
                    <Button size="small" color="primary" onClick={() => onView(product._id)}>
                        View
                    </Button>
                )}
                {onAddToCart && (
                    <Button size="small" color="secondary" onClick={() => onAddToCart(product._id)}>
                        Add to Cart
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ProductCard;
