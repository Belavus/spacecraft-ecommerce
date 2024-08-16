import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const CarouselWithOverlay = ({ images, welcomeText }) => {
    return (
        <Carousel interval={7000} indicators={false} duration={3000}>
            {images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative', width: '100%', height: '500px' }}>
                    <CardMedia
                        component="img"
                        image={image}
                        alt={`Carousel ${index}`}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            pointerEvents: 'none',
                        }}
                    />
                    <Typography
                        variant="h2"  // Используем h2 или другой уровень
                        align="center"
                        sx={{
                            position: 'absolute',
                            bottom: 40,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontWeight: 'bold',  // Жирный шрифт
                            fontSize: '3rem', // Увеличенный размер текста
                        }}
                    >
                        {welcomeText}
                    </Typography>
                </Box>
            ))}
        </Carousel>
    );
};

export default CarouselWithOverlay;
