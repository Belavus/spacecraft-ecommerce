import React, {createContext, useState, useEffect, useContext} from 'react';
import api from '../services/api';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, fetchProducts, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider };
