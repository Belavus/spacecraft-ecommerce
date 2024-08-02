import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import apiService from '../services/ApiService';

const HomePageManage = () => {
    const [carouselImages, setCarouselImages] = useState([]);
    const [welcomeText, setWelcomeText] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        const fetchHomePageInfo = async () => {
            try {
                const res = await apiService.getHomePageInfo();
                setCarouselImages(res.data.carouselImages);
                setWelcomeText(res.data.welcomeText);
            } catch (error) {
                console.error('Failed to fetch home page info', error);
            }
        };

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
            await apiService.updateHomePageInfo({ carouselImages, welcomeText });
            alert('HomePage info updated successfully');
        } catch (error) {
            console.error('Failed to update home page info', error);
            alert('Failed to update home page info');
        }
    };

    return (
        <div>
            <Typography variant="h6">Manage HomePage</Typography>
            <TextField
                label="Welcome Text"
                value={welcomeText}
                onChange={(e) => setWelcomeText(e.target.value)}
                fullWidth
                style={{ marginBottom: '16px' }}
            />
            <Typography variant="h6">Carousel Images</Typography>
            {carouselImages.map((image, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                    <TextField
                        value={image}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        style={{ marginBottom: '8px' }}
                    />
                    <Button variant="contained" color="secondary" onClick={() => handleRemoveImage(index)}>Remove</Button>
                </div>
            ))}
            <TextField
                label="New Image URL"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                fullWidth
                style={{ marginBottom: '16px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddImage}>Add Image</Button>
            <div style={{ marginTop: '16px' }}>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        </div>
    );
};

export default HomePageManage;
