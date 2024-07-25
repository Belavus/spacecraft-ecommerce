import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import VideoPlayer from '../components/VideoPlayer';

const ProductPage = () => {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const product = products.find((p) => p._id === id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            {product.videoUrl && <VideoPlayer src={product.videoUrl} />}
        </div>
    );
};

export default ProductPage;
