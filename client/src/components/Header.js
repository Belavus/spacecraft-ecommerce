import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../contexts/UserContext';
import {CartContext} from '../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import Badge from '@mui/material/Badge';

const Header = () => {
    const {user, logout} = useContext(UserContext);
    const {cartItemCount} = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static" style={{marginBottom: 0, width: '100%'}}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
                    <HomeIcon/>
                </IconButton>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    E-Commerce
                </Typography>
                <IconButton color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={cartItemCount} color="secondary">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
                {user ? (
                    <>
                        <Typography variant="h6" style={{marginRight: '1rem'}}>
                            {user.name}
                        </Typography>
                        {user.isAdmin ?
                            <Button variant="contained" color="primary" onClick={() => {
                                navigate('/admin')
                            }}>
                                Admin
                            </Button> : <Button variant="contained" color="primary" onClick={() => {
                                navigate('/admin')
                            }}>Profile</Button>}
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
