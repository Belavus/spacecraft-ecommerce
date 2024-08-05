import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';
import api from '../services/api';
import {Box, Checkbox, Container, FormControlLabel, TextField, Typography} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

const LoginPage = () => {
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useContext(UserContext);
    const navigate = useNavigate();


    const handleLogin = async (event) => {
        event.preventDefault();
        const loginPageInfo = new FormData(event.currentTarget);
        const email = loginPageInfo.get('email');
        const password = loginPageInfo.get('password');

        try {
            console.log( email)
            console.log(password)
            const {data} = await api.post('auth/login', {email, password});
            login(data.token);
            console.log(data)
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    }

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await api.post('/auth/login', { email, password });
//             login(data.token);
//             console.log(data)
//             navigate('/');
//         } catch (err) {
//             setError('Invalid email or password');
//         }
//     };

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
                <Box component="form" onSubmit={handleLogin} noValidate sx={{mt: 1}}>
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
                        control={<Checkbox value="remember" color="primary" />}
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
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../contexts/UserContext';
// import api from '../services/api';
//
// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login } = useContext(UserContext);
//     const navigate = useNavigate();
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await api.post('/auth/login', { email, password });
//             login(data.token);
//             console.log(data)
//             navigate('/');
//         } catch (err) {
//             setError('Invalid email or password');
//         }
//     };
//
//     return (
//         <div>
//             <h1>Login</h1>
//             {error && <p>{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Email</label>
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };
//
// export default LoginPage;
