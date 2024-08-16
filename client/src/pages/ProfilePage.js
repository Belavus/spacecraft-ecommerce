import React, {useEffect, useState, useContext} from 'react';
import {Container, Grid, Typography, CircularProgress, Button, Card, CardContent, TextField} from '@mui/material';
import apiService from '../services/ApiService';
import {UserContext} from '../contexts/UserContext';
import SmallProductCard from '../components/SmallProductCard';
import PageContainer from "../components/PageContainer/PageContainer";

const ProfilePage = () => {
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersRes = await apiService.getOrders();
                setOrders(ordersRes.data);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            } finally {
                setLoadingOrders(false);
            }
        };
        fetchOrders();
    }, [user]);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        try {
            await apiService.changeUserPassword(currentPassword, newPassword);
            setPasswordSuccess('Password changed successfully');
            setPasswordError('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Failed to change password', error);
            setPasswordError('Failed to change password. Please check your current password.');
            setPasswordSuccess('');
        }
    };

    const calculateOrderTotal = (order) => {
        return order.items.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    const filteredOrders = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter(order =>
            order.items.some(item =>
                item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.product.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

    if (loadingOrders) {
        return <CircularProgress/>;
    }

    return (
        <PageContainer>
            <Container>
                <Typography variant="h4">Profile:</Typography>
                <Typography variant="h5">
                    {user ? (
                        <div>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    ) : (
                        <p>Please log in</p>
                    )}
                </Typography>

                {/* Password Change Section */}
                <Typography variant="h6" style={{marginTop: '32px'}}>
                    Change Password
                </Typography>
                <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordError && <Typography color="error">{passwordError}</Typography>}
                {passwordSuccess && <Typography color="primary">{passwordSuccess}</Typography>}
                <Button variant="contained" color="primary" onClick={handleChangePassword}>
                    Change Password
                </Button>

                <TextField
                    label="Search Orders"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Typography variant="h4" style={{marginTop: '32px'}}>
                    Your Orders
                </Typography>
                {filteredOrders.length > 0 ? (
                    <Grid container spacing={4}>
                        {filteredOrders.map((order) => (
                            <Grid item key={order._id} xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Order ID: {order._id}
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {order.items.map((item) => (
                                                <Grid item key={item.product._id} xs={6} sm={4} md={3}>
                                                    <SmallProductCard product={item.product}/>
                                                    <Typography variant="body1" color="textSecondary">
                                                        Quantity: {item.quantity}
                                                    </Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        <Typography variant="body2" color="textSecondary">
                                            Order Date: {new Date(order.createdAt).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="h6" style={{marginTop: '16px'}}>
                                            Total: ${calculateOrderTotal(order)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h6">You have no orders</Typography>
                )}
            </Container>
        </PageContainer>
    );
};

export default ProfilePage;
