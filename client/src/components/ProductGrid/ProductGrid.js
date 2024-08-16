import React from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from "../ProductCard";

const ProductGrid = ({ products, loading, error, onView, onAddToCart }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Typography variant="h1">New Arrival</Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={3} style={{ display: 'flex' }}>
                        <ProductCard
                            product={product}
                            onView={onView}
                            onAddToCart={onAddToCart}
                            style={{ flexGrow: 1 }}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ProductGrid;
