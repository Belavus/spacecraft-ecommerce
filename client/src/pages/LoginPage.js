import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import api from '../services/api';
import { Box, Checkbox, Container, FormControlLabel, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const LoginPage = () => {
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const loginPageInfo = new FormData(event.currentTarget);
        const email = loginPageInfo.get('email');
        const password = loginPageInfo.get('password');

        try {
            const { data } = await api.post('auth/login', { email, password });
            login(data.token, rememberMe);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
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
                    Sign in
                </Typography>
                {error && <p>{error}</p>}
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
                    <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Typography>Don't have an account? Sign Up</Typography>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
