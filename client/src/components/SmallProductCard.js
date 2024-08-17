import React from 'react';
import {Box, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {formatNumberWithCommas} from "../utils/utils";
import mainTheme from "../theme/mainTheme";

const SmallProductCard = ({product}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product._id}`);
    };

    return (
        <Card sx={{
            backgroundColor: mainTheme.palette.background.light,
            maxWidth: 150,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }} onClick={handleClick}>
            <CardMedia
                component="img"
                height="150"
                image={product.imageUrl}
                alt={product.name}
                style={{objectFit: 'cover'}}
            />
            <CardContent sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Box>
                    <Typography gutterBottom variant="body1" component="div">
                        {product.name}
                    </Typography>
                </Box>
                <Box sx={{mt: 'auto'}}>
                    <Typography variant="body2" color="text.secondary" align="right">
                        {formatNumberWithCommas(product.price)} $
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SmallProductCard;
