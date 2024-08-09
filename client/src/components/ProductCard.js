import React, {useState} from 'react';
import {Card, CardContent, CardMedia, Typography, CardActions, Button, Box, Chip, Grid, Stack} from '@mui/material';

const ProductCard = ({product, onView, onAddToCart}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

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
                <Typography
                    variant="body2"
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: showFullDescription ? 'unset' : 3,
                        maxHeight: showFullDescription ? 'none' : '4.5em',
                        transition: 'max-height 0.3s ease'
                    }}
                >
                    {product.description}
                </Typography>
                <Button size="small" onClick={toggleDescription}>
                    {showFullDescription ? 'Show Less' : 'Read More'}
                </Button>
                <Grid style={{margin: '5px'}}>
                        <Chip margin={'2px'} label={'Engine Count: ' + product.engineCount} variant="outlined"/>
                        <Chip label={'Engine Type: ' + product.engineType} variant="outlined"/>
                        <Chip label={'Purpose: ' + product.purpose} variant="outlined"/>
                </Grid>
                <Typography variant="h6">
                    ${product.price}
                </Typography>
                <Typography variant="body2">
                    {product.orderCount} sold
                </Typography>
            </CardContent>
            <CardActions>
                {onView && (
                    <Button sx={{boxShadow: 2}} size="small" onClick={() => onView(product._id)}>
                        View
                    </Button>
                )}
                {onAddToCart && (
                    <Button sx={{boxShadow: 2}} size="small" onClick={() => onAddToCart(product._id)}>
                        Add to Cart
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ProductCard;
