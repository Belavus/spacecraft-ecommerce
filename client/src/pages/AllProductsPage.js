import React, {useEffect, useState, useContext} from 'react';
import apiService from '../services/ApiService';
import {
    Container,
    Grid,
    Typography,
    Autocomplete,
    TextField,
    Button,
    Slider,
    Select,
    MenuItem,
    FormControl,
    InputLabel, Box
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {CartContext} from '../contexts/CartContext';
import PageContainer from "../components/PageContainer/PageContainer";

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        engineCount: null,
        engineType: null,
        purpose: null,
        searchQuery: '',
        priceRange: [0, 10000],
        sortOrder: 'asc'
    });
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
        let filtered = products.filter(product => {
            const matchesSearchQuery = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
            const matchesPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
            return (
                matchesSearchQuery &&
                matchesPriceRange &&
                (filters.engineCount === null || product.engineCount === filters.engineCount) &&
                (filters.engineType === null || product.engineType === filters.engineType) &&
                (filters.purpose === null || product.purpose === filters.purpose)
            );
        });

        if (filters.sortOrder === 'asc') {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sortOrder === 'desc') {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    };

    const resetFilters = () => {
        setFilters({
            engineCount: null,
            engineType: null,
            purpose: null,
            searchQuery: '',
            priceRange: [0, 10000],
            sortOrder: 'asc'
        });
        setFilteredProducts(products);
    };

    return (
        <PageContainer>
            <Grid style={{display: 'flex', flexDirection: 'row', width: '100%', padding: '15px'}}>
                <Box style={{
                    minWidth: '350px',
                    flexDirection: 'row',
                    paddingRight: '20px',
                }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={filters.searchQuery}
                        onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                        style={{marginBottom: '16px', width: '100%'}}
                    />
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
                    <Typography gutterBottom>
                        Price Range
                    </Typography>
                    <Slider
                        value={filters.priceRange}
                        onChange={(event, newValue) => handleFilterChange('priceRange', newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000} // Adjust the max value according to your product prices
                        style={{marginBottom: '16px'}}
                    />
                    <FormControl fullWidth style={{marginBottom: '16px'}}>
                        <InputLabel id="sortOrder-label">Sort</InputLabel>
                        <Select
                            labelId="sortOrder-label"
                            id="sortOrder"
                            value={filters.sortOrder}
                            label="Sort"
                            onChange={(event) => handleFilterChange('sortOrder', event.target.value)}
                        >
                            <MenuItem value="asc">Price: Low to High</MenuItem>
                            <MenuItem value="desc">Price: High to Low</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={applyFilters}
                            style={{marginBottom: '16px', width: '100%'}}>
                        Apply Filters
                    </Button>
                    <Button variant="contained" onClick={resetFilters}
                            style={{marginBottom: '16px', width: '100%'}}>
                        Reset Filters
                    </Button>
                </Box>

                <Box style={{
                    flexGrow: 1,
                }}>
                    <Grid container spacing={4}>
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
                </Box>
            </Grid>
        </PageContainer>
    );
};

export default AllProductsPage;