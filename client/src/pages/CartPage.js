import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Button } from '@mui/material';
import apiService from '../services/ApiService';
import { UserContext } from '../contexts/UserContext';

const CartPage = () => {
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartAndOrders = async () => {
            try {
                const [cartRes, ordersRes] = await Promise.all([
                    apiService.getCart(),
                    apiService.getOrders(),
                ]);
                setCart(cartRes.data);
                setOrders(ordersRes.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch cart and orders', error);
                setLoading(false);
            }
        };
        fetchCartAndOrders();
    }, [user]);

    const handleRemoveItem = async (productId) => {
        try {
            await apiService.deleteCartItem(productId);
            const res = await apiService.getCart();
            setCart(res.data);
        } catch (error) {
            console.error('Failed to remove item from cart', error);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            await apiService.placeOrder();
            const res = await apiService.getCart();
            setCart(res.data);
            const ordersRes = await apiService.getOrders();
            setOrders(ordersRes.data);
            alert('Order placed successfully');
        } catch (error) {
            console.error('Failed to place order', error);
            alert('Failed to place order');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!cart || cart.items.length === 0) {
        return <Typography variant="h5">Your cart is empty</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            <Grid container spacing={4}>
                {cart.items.map((item) => (
                    <Grid item key={item.product._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.product.imageUrl}
                                alt={item.product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.product.description}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    Quantity: {item.quantity}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    Price: ${item.product.price}
                                </Typography>
                                <Typography variant="h6" color={item.isOrdered ? 'primary' : 'secondary'}>
                                    {item.isOrdered ? 'Ordered' : 'Not Ordered'}
                                </Typography>
                            </CardContent>
                            <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.product._id)}>
                                Remove
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={handlePlaceOrder} style={{ marginTop: '16px' }}>
                Place Order
            </Button>

            <Typography variant="h4" gutterBottom style={{ marginTop: '32px' }}>
                Your Orders
            </Typography>
            <Grid container spacing={4}>
                {orders.map((order) => (
                    <Grid item key={order._id} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Order ID: {order._id}
                                </Typography>
                                {order.items.map((item) => (
                                    <div key={item.product._id}>
                                        <Typography variant="body1" color="textSecondary">
                                            Product: {item.product.name}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            Quantity: {item.quantity}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary">
                                            Price: ${item.product.price}
                                        </Typography>
                                    </div>
                                ))}
                                <Typography variant="body2" color="textSecondary">
                                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CartPage;