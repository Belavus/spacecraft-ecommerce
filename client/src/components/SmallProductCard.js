import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SmallProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product._id}`);
    };

    return (
        <Card style={{ maxWidth: 150, cursor: 'pointer' }} onClick={handleClick}>
            <CardMedia
                component="img"
                height="150"
                image={product.imageUrl}
                alt={product.name}
                style={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${product.price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default SmallProductCard;
