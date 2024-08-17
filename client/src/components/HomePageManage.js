import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Box, Stack} from '@mui/material';
import apiService from '../services/ApiService';

const HomePageManage = () => {
    const [carouselImages, setCarouselImages] = useState([]);
    const [welcomeText, setWelcomeText] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    const fetchHomePageInfo = async () => {
        try {
            const res = await apiService.getHomePageInfo();
            setCarouselImages(res.data.carouselImages);
            setWelcomeText(res.data.welcomeText);
        } catch (error) {
            console.error('Failed to fetch home page info', error);
        }
    };

    useEffect(() => {
        fetchHomePageInfo();
    }, []);

    const handleAddImage = () => {
        setCarouselImages([...carouselImages, newImageUrl]);
        setNewImageUrl('');
    };

    const handleRemoveImage = (index) => {
        setCarouselImages(carouselImages.filter((_, i) => i !== index));
    };

    const handleSaveChanges = async () => {
        try {
            await apiService.updateHomePageInfo({carouselImages, welcomeText});
            alert('HomePage info updated successfully');
        } catch (error) {
            console.error('Failed to update home page info', error);
            alert('Failed to update home page info');
        }
    };

    return (
        <Box>
            <TextField
                label="Welcome Text"
                value={welcomeText}
                onChange={(e) => setWelcomeText(e.target.value)}
                fullWidth
                style={{marginBottom: '16px'}}
            />
            <Typography variant="h6">Carousel Images</Typography>
            {carouselImages.map((image, index) => (
                <div key={index} style={{marginBottom: '16px'}}>
                    <TextField
                        value={image}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        style={{marginBottom: '8px'}}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleRemoveImage(index)}>Remove</Button>
                </div>
            ))}

            <TextField
                label="New Image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                fullWidth
                style={{marginBottom: '16px'}}
            />
            <Button variant="contained" color="primary" onClick={handleAddImage}>Add Image</Button>
            <Stack mt={2} mb={5}>
                <Button variant="contained" color="secondary" onClick={handleSaveChanges}>Save Changes</Button>
            </Stack>
        </Box>
    );
};

export default HomePageManage;
