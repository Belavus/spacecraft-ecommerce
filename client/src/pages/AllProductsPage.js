import React, {useEffect, useState, useContext} from 'react';
import apiService from '../services/ApiService';
import {Container, Grid, Typography, Autocomplete, TextField, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {CartContext} from '../contexts/CartContext';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({engineCount: null, engineType: null, purpose: null});
    const [uniqueValues, setUniqueValues] = useState({engineCounts: [], engineTypes: [], purposes: []});
    const navigate = useNavigate();
    const {addToCart} = useContext(CartContext);

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

        const fetchUniqueValues = async () => {
            try {
                const res = await apiService.getUniqueProductValues();
                setUniqueValues(res.data);
            } catch (error) {
                console.error('Failed to fetch unique product values', error);
            }
        };

        fetchProducts();
        fetchUniqueValues();
    }, []);

    const handleViewProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleFilterChange = (name, value) => {
        setFilters({...filters, [name]: value});
    };

    const applyFilters = () => {
        setFilteredProducts(products.filter(product => {
            return (
                (filters.engineCount === null || product.engineCount === filters.engineCount) &&
                (filters.engineType === null || product.engineType === filters.engineType) &&
                (filters.purpose === null || product.purpose === filters.purpose)
            );
        }));
    };

    const resetFilters = () => {
        setFilters({engineCount: null, engineType: null, purpose: null});
        setFilteredProducts(products);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                All Products
            </Typography>
            <div style={{display: 'flex'}}>
                <div style={{width: '300px', marginRight: '16px', position: 'fixed', top: '80px', left: '16px'}}>
                    <Autocomplete
                        id="engineCount"
                        options={uniqueValues.engineCounts}
                        getOptionLabel={(option) => option.toString()}
                        value={filters.engineCount}
                        onChange={(event, newValue) => handleFilterChange('engineCount', newValue)}
                        renderInput={(params) => <TextField {...params} label="Engine Count" variant="outlined"/>}
                        style={{marginBottom: '16px'}}
                    />
                    <Autocomplete
                        id="engineType"
                        options={uniqueValues.engineTypes}
                        getOptionLabel={(option) => option}
                        value={filters.engineType}
                        onChange={(event, newValue) => handleFilterChange('engineType', newValue)}
                        renderInput={(params) => <TextField {...params} label="Engine Type" variant="outlined"/>}
                        style={{marginBottom: '16px'}}
                    />
                    <Autocomplete
                        id="purpose"
                        options={uniqueValues.purposes}
                        getOptionLabel={(option) => option}
                        value={filters.purpose}
                        onChange={(event, newValue) => handleFilterChange('purpose', newValue)}
                        renderInput={(params) => <TextField {...params} label="Purpose" variant="outlined"/>}
                        style={{marginBottom: '16px'}}
                    />
                        <Button sx={{width:'300px'}} variant="contained" color="primary" onClick={applyFilters}
                                style={{marginBottom: '16px'}}>
                            Apply Filters
                        </Button>
                        <Button sx={{width:'300px'}} variant="contained" color="secondary" onClick={resetFilters}>
                            Reset Filters
                        </Button>

                </div>
                <div style={{flexGrow: 1}}>
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
                </div>
            </div>
        </Container>
    );
};

export default AllProductsPage;
