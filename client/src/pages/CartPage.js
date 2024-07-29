import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Button } from '@mui/material';
import apiService from '../services/ApiService';
import { UserContext } from '../contexts/UserContext';

const CartPage = () => {
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await apiService.getCart();
                setCart(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch cart', error);
                setLoading(false);
            }
        };
        fetchCart();
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
                            </CardContent>
                            <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.product._id)}>
                                Remove
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CartPage;


// import React, { useContext } from 'react';
// import { CartContext } from '../contexts/CartContext';
//
// const CartPage = () => {
//     const { cart, addToCart, removeFromCart } = useContext(CartContext);
//
//     return (
//         <div>
//             <h1>Cart</h1>
//             {cart.length === 0 ? (
//                 <p>Your cart is empty</p>
//             ) : (
//                 <ul>
//                     {cart.map((item) => (
//                         <li key={item._id}>
//                             {item.name}
//                             <button onClick={() => removeFromCart(item._id)}>Remove</button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };
//
// export default CartPage;