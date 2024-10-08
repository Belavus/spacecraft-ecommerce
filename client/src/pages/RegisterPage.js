import React, {useState} from 'react';
import api from '../services/api';
import {Box, Container, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import PageContainer from "../components/PageContainer/PageContainer";

const RegisterPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (event) => {
        event.preventDefault();
        const registerPageInfo = new FormData(event.currentTarget)
        const name = registerPageInfo.get('name');
        const email = registerPageInfo.get('email');
        const password = registerPageInfo.get('password');

        // password checking
        if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
            setError('Password must be at least 8 characters long and include a number and a special character.');
            return;
        }

        try {
            await api.post('/auth/register', {name, email, password});
            navigate('/login')
        } catch (err) {
            setError('Failed to register user');
        }
    };

    return (
        <PageContainer>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleRegister}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        {error && <p>* {error}</p>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </PageContainer>
    );
};

export default RegisterPage;