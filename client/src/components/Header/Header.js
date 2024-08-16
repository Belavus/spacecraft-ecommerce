import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import logo from '../../resources/logo.svg';
import {Box} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';


const Header = () => {
    const { user, logout } = useContext(UserContext);
    const { cartItemCount } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
                    <img src={logo} alt="Logo" style={{ height: '100%', maxHeight: '40px' }} />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton color="inherit" component={Link} to="/cart">
                        <Badge badgeContent={cartItemCount} color="secondary">
                            <ShoppingCartIcon/>
                        </Badge>
                    </IconButton>
                    {user ? (
                        <>
                            <IconButton
                                onClick={() => navigate(user.isAdmin ? '/admin' : '/profile')}
                                color="inherit"
                            >
                                {user.isAdmin ? <AdminPanelSettingsIcon /> : <PersonIcon />}
                            </IconButton>
                            <IconButton onClick={handleLogout} color="inherit">
                                <LogoutIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    )}
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Header;
