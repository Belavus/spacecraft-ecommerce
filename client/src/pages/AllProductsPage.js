import React, { useEffect, useState } from 'react';
import apiService from '../services/ApiService';
import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiService.getProducts();
                setProducts(res.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, []);

    const handleViewProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleAddToCart = async (productId) => {
        try {
            await apiService.addToCart({ productId, quantity: 1 });
            alert('Product added to cart');
        } catch (error) {
            console.error('Failed to add product to cart', error);
            alert('Failed to add product to cart');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                All Products
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <ProductCard
                            product={product}
                            onView={handleViewProduct}
                            onAddToCart={handleAddToCart}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AllProductsPage;


// import React, { useEffect, useState } from 'react';
// import apiService from '../services/ApiService';
// import { Container, Grid, Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
//
// const AllProductsPage = () => {
//     const [products, setProducts] = useState([]);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const res = await apiService.getProducts();
//                 setProducts(res.data);
//             } catch (error) {
//                 console.error('Failed to fetch products', error);
//             }
//         };
//         fetchProducts();
//     }, []);
//
//     const handleViewProduct = (productId) => {
//         navigate(`/product/${productId}`);
//     };
//
//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 All Products
//             </Typography>
//             <Grid container spacing={3}>
//                 {products.map((product) => (
//                     <Grid item key={product._id} xs={12} sm={6} md={4}>
//                         <Card>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image={product.imageUrl}
//                                 alt={product.name}
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h5" component="div">
//                                     {product.name}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {product.description}
//                                 </Typography>
//                                 <Typography variant="h6" color="text.primary">
//                                     ${product.price}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button size="small" color="primary" onClick={() => handleViewProduct(product._id)}>
//                                     View
//                                 </Button>
//                                 <Button size="small" color="secondary">
//                                     Add to Cart
//                                 </Button>
//                             </CardActions>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };
//
// export default AllProductsPage;
