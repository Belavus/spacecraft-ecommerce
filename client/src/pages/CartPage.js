import React, {useEffect, useState, useContext} from 'react';
import {Container, Grid, Typography, CircularProgress, Button, Card, CardContent, TextField, Box} from '@mui/material';
import apiService from '../services/ApiService';
import {UserContext} from '../contexts/UserContext';
import {CartContext} from '../contexts/CartContext';
import {ProductContext} from '../contexts/ProductContext'
import ProductCard from '../components/ProductCard';
import SmallProductCard from '../components/SmallProductCard';
import PageContainer from "../components/PageContainer/PageContainer";

const CartPage = () => {
    const {user} = useContext(UserContext);
    const {cart, updateCart, removeFromCart, updateCartQuantity} = useContext(CartContext);
    const {fetchProducts} = useContext(ProductContext);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [quantity, setQuantity] = useState({});

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

    useEffect(() => {
        fetchOrders();
        updateCart();
        setLoadingOrders(false)
    }, [user, updateCart]);

    const handleRemoveItem = async (productId) => {
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('Failed to remove item from cart', error);
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        setQuantity(prevQuantity => ({
            ...prevQuantity,
            [productId]: newQuantity
        }));
    };

    const handleSetQuantity = (productId) => {
        if (quantity[productId] && quantity[productId] > 0) {
            updateCartQuantity(productId, quantity[productId]);
        }
    };

    const handlePlaceOrder = async () => {
        try {
            await apiService.placeOrder();
            await updateCart();
            const ordersRes = await apiService.getOrders();
            setOrders(ordersRes.data);
            fetchProducts();
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

    if (loadingOrders) {
        return <PageContainer><CircularProgress/></PageContainer>;
    }

    return (
        <PageContainer>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Your Cart
                </Typography>
                {cart && cart.items.length > 0 ? (
                    <Box>
                        <Grid container spacing={4}>
                            {cart.items.map((item) => (
                                item.product ? (
                                    <Grid item key={item.product._id} xs={12} sm={6} md={4}>
                                        <Box sx={{ width: 300}}>
                                            <ProductCard
                                                product={item.product}
                                                onView={null}
                                                onAddToCart={null}
                                            />
                                            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                                <TextField sx={{width:'50%'}}
                                                    type="number"
                                                    label="Quantity"
                                                    variant="outlined"
                                                    value={quantity[item.product._id] || item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                                    inputProps={{ min: 1 }}
                                                />
                                                <Button sx={{ height: '40px'}} onClick={() => handleSetQuantity(item.product._id)}
                                                >
                                                    Set
                                                </Button>
                                                <Button sx={{ height: '40px' }} onClick={() => handleRemoveItem(item.product._id)}
                                                >
                                                    Remove
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ) : (
                                    <Grid item key={item._id} xs={12} sm={6} md={4}>
                                        <Typography variant="body2" color="error">
                                            Product information is not available.
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleRemoveItem(item._id)}
                                        >
                                            Remove from Cart
                                        </Button>
                                    </Grid>
                                )
                            ))}
                        </Grid>
                        <Typography variant="h6">
                            Total: ${calculateCartTotal()}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
                            Place Order
                        </Button>
                    </Box>
                ) : (
                    <Typography variant="h6">Your cart is empty</Typography>
                )}

                <Typography variant="h4" gutterBottom>
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
                                        <Typography variant="h6">
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

export default CartPage;