import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Typography, CircularProgress, Button, Card, CardContent, TextField } from '@mui/material';
import apiService from '../services/ApiService';
import { UserContext } from '../contexts/UserContext';
import SmallProductCard from '../components/SmallProductCard';

const ProfilePage = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

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

    const calculateOrderTotal = (order) => {
        return order.items.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    const filteredOrders = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Сортировка от последнего к первому
        .filter(order =>
            order.items.some(item =>
                item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.product.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

    if (loadingOrders) {
        return <CircularProgress />;
    }

    return (
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
            <TextField
                label="Search Orders"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Typography variant="h4" style={{ marginTop: '32px' }}>
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
                                                <SmallProductCard product={item.product} />
                                                <Typography variant="body1" color="textSecondary">
                                                    Quantity: {item.quantity}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Typography variant="body2" color="textSecondary">
                                        Order Date: {new Date(order.createdAt).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="h6" style={{ marginTop: '16px' }}>
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

export default ProfilePage;


// import React, {useEffect, useState, useContext} from 'react';
// import {Container, Grid, Typography, CircularProgress, Button, Card, CardContent} from '@mui/material';
// import apiService from '../services/ApiService';
// import {UserContext} from '../contexts/UserContext';
// import SmallProductCard from '../components/SmallProductCard';
//
// const ProfilePage = () => {
//     const {user} = useContext(UserContext);
//     const [orders, setOrders] = useState([]);
//     const [loadingOrders, setLoadingOrders] = useState(true);
//
//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const ordersRes = await apiService.getOrders();
//                 setOrders(ordersRes.data);
//             } catch (error) {
//                 console.error('Failed to fetch orders', error);
//             } finally {
//                 setLoadingOrders(false);
//             }
//         };
//         fetchOrders();
//     }, [user]);
//
//     const calculateOrderTotal = (order) => {
//         return order.items.reduce((total, item) => {
//             return total + item.quantity * item.product.price;
//         }, 0);
//     };
//
//     if (loadingOrders) {
//         return <CircularProgress/>;
//     }
//
//     return (
//         <Container>
//             <Typography variant="h4">Profile:</Typography>
//             <Typography variant="h5">
//                 {user ? (
//                     <div>
//                         <p>Name: {user.name}</p>
//                         <p>Email: {user.email}</p>
//                     </div>
//                 ) : (
//                     <p>Please log in</p>
//                 )}
//             </Typography>
//             <Typography variant="h4" style={{marginTop: '32px'}}>
//                 Your Orders
//             </Typography>
//             {orders.length > 0 ? (
//                 <Grid container spacing={4}>
//                     {orders.map((order) => (
//                         <Grid item key={order._id} xs={12}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h5" component="div">
//                                         Order ID: {order._id}
//                                     </Typography>
//                                     <Grid container spacing={2}>
//                                         {order.items.map((item) => (
//                                             <Grid item key={item.product._id} xs={6} sm={4} md={3}>
//                                                 <SmallProductCard
//                                                     product={item.product}
//                                                 />
//                                                 <Typography variant="body1" color="textSecondary">
//                                                     Quantity: {item.quantity}
//                                                 </Typography>
//                                             </Grid>
//                                         ))}
//                                     </Grid>
//                                     <Typography variant="body2" color="textSecondary">
//                                         Order Date: {new Date(order.createdAt).toLocaleDateString()}
//                                     </Typography>
//                                     <Typography variant="h6" style={{marginTop: '16px'}}>
//                                         Total: ${calculateOrderTotal(order)}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             ) : (
//                 <Typography variant="h6">You have no orders</Typography>
//             )}
//         </Container>
//     );
// };
//
// export default ProfilePage;