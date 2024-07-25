import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import CanvasComponent from '../components/CanvasComponent';
import Chat from '../components/Chat';
import Statistics from '../components/Statistics';

const HomePage = () => {
    const { products, loading, error } = useContext(ProductContext);

    // Пример данных для статистики
    const statsData = products.map(product => ({
        name: product.name,
        value: Math.floor(Math.random() * 100)
    }));

    return (
        <div>
            <h1>Products</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product._id} className="product-item">
                            {product.name}
                        </div>
                    ))}
                </div>
            )}
            <CanvasComponent />
            <Chat />
            <Statistics data={statsData} />
        </div>
    );
};

export default HomePage;
