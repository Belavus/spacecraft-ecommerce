import React from 'react';
import {Box, IconButton, Stack, Typography} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import mainTheme from "../theme/mainTheme";

const Footer = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: mainTheme.palette.primary,
                color: '#fff',
                marginTop: 'auto',
            }}
        >
            <Stack>
                <Typography>
                    Copyright © Maksim Blaus 2024
                </Typography>
                <Stack alignItems='center' direction='row'><Typography variant="body2" sx={{marginRight: 1}}>
                    Connect with me:
                </Typography>
                    <IconButton
                        component="a"
                        href="https://www.linkedin.com/in/maksim-belavus-comp/"
                        target="_blank"
                        sx={{color: '#fff'}}
                    >
                        <LinkedInIcon fontSize="large"/>
                    </IconButton></Stack>
            </Stack>
        </Box>
    );
};

export default Footer;
