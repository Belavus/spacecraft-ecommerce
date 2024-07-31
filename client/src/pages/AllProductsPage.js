import React, { useEffect, useState, useContext } from 'react';
import apiService from '../services/ApiService';
import { Container, Grid, Typography, TextField, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../contexts/CartContext';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({ engineCount: '', engineType: '', purpose: '' });
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiService.getProducts();
                setProducts(res.data);
                setFilteredProducts(res.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, []);

    const handleViewProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        setFilteredProducts(products.filter(product => {
            return (
                (filters.engineCount === '' || product.engineCount === parseInt(filters.engineCount)) &&
                (filters.engineType === '' || product.engineType === filters.engineType) &&
                (filters.purpose === '' || product.purpose === filters.purpose)
            );
        }));
    };

    const resetFilters = () => {
        setFilters({ engineCount: '', engineType: '', purpose: '' });
        setFilteredProducts(products);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                All Products
            </Typography>

            <div>
                <TextField
                    label="Engine Count"
                    name="engineCount"
                    value={filters.engineCount}
                    onChange={handleFilterChange}
                    select
                    variant="outlined"
                    style={{ marginRight: '16px', marginBottom: '16px' }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                </TextField>
                <TextField
                    label="Engine Type"
                    name="engineType"
                    value={filters.engineType}
                    onChange={handleFilterChange}
                    select
                    variant="outlined"
                    style={{ marginRight: '16px', marginBottom: '16px' }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Type1">Type1</MenuItem>
                    <MenuItem value="Type2">Type2</MenuItem>
                    <MenuItem value="Type3">Type3</MenuItem>
                </TextField>
                <TextField
                    label="Purpose"
                    name="purpose"
                    value={filters.purpose}
                    onChange={handleFilterChange}
                    select
                    variant="outlined"
                    style={{ marginRight: '16px', marginBottom: '16px' }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Cargo">Cargo</MenuItem>
                    <MenuItem value="Passenger">Passenger</MenuItem>
                    <MenuItem value="Military">Military</MenuItem>
                </TextField>
                <Button variant="contained" color="primary" onClick={applyFilters} style={{ marginRight: '16px' }}>
                    Apply Filters
                </Button>
                <Button variant="contained" color="secondary" onClick={resetFilters}>
                    Reset Filters
                </Button>
            </div>

            <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <ProductCard
                            product={product}
                            onView={handleViewProduct}
                            onAddToCart={addToCart}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default AllProductsPage;
