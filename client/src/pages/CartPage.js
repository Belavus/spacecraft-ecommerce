import React, { useEffect, useState, useContext } from 'react';
import {
    Container,
    Grid,
    Typography,
    CircularProgress,
    Button,
    TextField,
    Box,
    Stack
} from '@mui/material';
import apiService from '../services/ApiService';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import SmallProductCard from '../components/SmallProductCard';
import PageContainer from "../components/PageContainer/PageContainer";
import { formatNumberWithCommas } from "../utils/utils";
import mainTheme from "../theme/mainTheme";

const CartPage = () => {
    const { user } = useContext(UserContext);
    const { cart, updateCart, removeFromCart, updateCartQuantity } = useContext(CartContext);
    const { fetchProducts } = useContext(ProductContext);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingCart, setLoadingCart] = useState(true); // Отдельное состояние для загрузки корзины
    const [quantity, setQuantity] = useState({});
    const [timeoutId, setTimeoutId] = useState(null);

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
        const loadCart = async () => {
            await updateCart();
            setLoadingCart(false);
        };

        fetchOrders();
        loadCart();
    }, [user, updateCart]);

    const handleQuantityChange = (productId, newQuantity) => {
        setQuantity(prevQuantity => ({
            ...prevQuantity,
            [productId]: newQuantity
        }));

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            if (newQuantity > 0) {
                updateCartQuantity(productId, newQuantity);
            }
        }, 500); // Задержка 500 мс

        setTimeoutId(newTimeoutId);
    };

    const handleRemoveItem = async (productId) => {
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('Failed to remove item from cart', error);
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

    if (loadingCart || loadingOrders) {
        return (
            <PageContainer>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            </PageContainer>
        );
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
                                    <Grid item key={item.product._id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                                        <Stack spacing={3} sx={{ width: '100%', height: '100%' }}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <ProductCard
                                                    product={item.product}
                                                    onView={null}
                                                    onAddToCart={null}
                                                />
                                            </Box>
                                            <TextField
                                                type="number"
                                                label="Quantity"
                                                variant="outlined"
                                                value={quantity[item.product._id] || item.quantity}
                                                onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                                inputProps={{ min: 1 }}
                                            />
                                            <Button variant="contained" color="primary" sx={{ height: '40px' }}
                                                    onClick={() => handleRemoveItem(item.product._id)}
                                            >
                                                Remove
                                            </Button>
                                        </Stack>
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
                        <Box height={25} />
                        <Stack spacing={2}>
                            <Typography variant="h6">
                                Total: ${calculateCartTotal()}
                            </Typography>
                            <Button onClick={handlePlaceOrder}>
                                Place Order
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    <Typography variant="h6">Your cart is empty</Typography>
                )}

                <Typography mt={5} variant="h4" gutterBottom>
                    Your Orders
                </Typography>
                {orders.length > 0 ? (
                    <Grid container spacing={4}>
                        {orders.map((order) => (
                            <Grid item key={order._id} xs={12}>
                                <Box padding={3} bgcolor={mainTheme.palette.background.paper}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Order ID: {order._id}
                                    </Typography>
                                    <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
                                        {order.items.map((item) => (
                                            <Stack spacing={2} key={item.product._id}>
                                                <SmallProductCard
                                                    product={item.product}
                                                />
                                                <Typography variant="body1" color="textSecondary">
                                                    Quantity: {item.quantity}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                    <Typography mt={4} variant="body2" color="textSecondary">
                                        Order Date: {new Date(order.createdAt).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="h6">
                                        Total: {formatNumberWithCommas(calculateOrderTotal(order))} $
                                    </Typography>
                                </Box>
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
