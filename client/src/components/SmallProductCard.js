import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const SmallProductCard = ({ product }) => {
    return (
        <Card style={{ maxWidth: 150 }}>
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
