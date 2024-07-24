import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';

const HomePage = () => {
    const { products, loading, error } = useContext(ProductContext);

    return (
        <div>
            <h1>Products</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>{product.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomePage;
