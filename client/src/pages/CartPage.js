import React, {useEffect, useState, useContext} from 'react';
import {Container, Grid, Typography, CircularProgress, Button, Card, CardContent, TextField} from '@mui/material';
import apiService from '../services/ApiService';
import {UserContext} from '../contexts/UserContext';
import {CartContext} from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import SmallProductCard from '../components/SmallProductCard';

const CartPage = () => {
    const {user} = useContext(UserContext);
    const {cart, updateCart, removeFromCart, updateCartQuantity} = useContext(CartContext);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

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
        updateCart();
    }, [user, updateCart]);

    const handleRemoveItem = async (productId) => {
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('Failed to remove item from cart', error);
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        updateCartQuantity(productId, newQuantity);
    };

    const handlePlaceOrder = async () => {
        try {
            await apiService.placeOrder();
            await updateCart();
            const ordersRes = await apiService.getOrders();
            setOrders(ordersRes.data);
            alert('Order placed successfully');
        } catch (error) {
            console.error('Failed to place order', error);
            alert('Failed to place order');
        }
    };

    const calculateCartTotal = () => {
        if (!cart || cart.items.length === 0) {
            return 0;
        }
        return cart.items.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    const calculateOrderTotal = (order) => {
        return order.items.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    if (!cart || loadingOrders) {
        return <CircularProgress/>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            {cart && cart.items.length > 0 ? (
                <div>
                    <Grid container spacing={4}>
                        {cart.items.map((item) => (
                            <Grid item key={item.product._id} xs={12} sm={6} md={4}>
                                <ProductCard
                                    product={item.product}
                                    onView={null}
                                    onAddToCart={null}
                                />
                                <TextField
                                    type="number"
                                    label="Quantity"
                                    variant="outlined"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                    inputProps={{min: 1}}
                                    fullWidth
                                    style={{marginTop: '10px'}}
                                />
                                <Button variant="contained" color="secondary"
                                        onClick={() => handleRemoveItem(item.product._id)}>
                                    Remove
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Typography variant="h6" style={{marginTop: '16px'}}>
                        Total: ${calculateCartTotal()}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handlePlaceOrder} style={{marginTop: '16px'}}>
                        Place Order
                    </Button>
                </div>
            ) : (
                <Typography variant="h6">Your cart is empty</Typography>
            )}

            <Typography variant="h4" gutterBottom style={{marginTop: '32px'}}>
                Your Orders
            </Typography>
            {orders.length > 0 ? (
                <Grid container spacing={4}>
                    {orders.map((order) => (
                        <Grid item key={order._id} xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Order ID: {order._id}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {order.items.map((item) => (
                                            <Grid item key={item.product._id} xs={6} sm={4} md={3}>
                                                <SmallProductCard
                                                    product={item.product}
                                                />
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
    );
};

export default CartPage;
