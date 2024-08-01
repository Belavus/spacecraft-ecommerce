import React, {useEffect, useState} from 'react';
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress
} from '@mui/material';
import apiService from "../services/ApiService";

const ProductManage = () => {
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '', imageUrl: '', videoUrl: '', engineCount: 0, engineType: '', purpose: '' });
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            const productRes = await apiService.getProducts();
            setProducts(productRes.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddProduct = async () => {
        try {
            await apiService.addProduct(newProduct);
            setNewProduct({ name: '', price: 0, description: '', imageUrl: '', videoUrl: '', engineCount: 0, engineType: '', purpose: '' });
            fetchData();
        } catch (error) {
            console.error('Failed to add product', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await apiService.deleteProduct(productId);
            fetchData();
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = async () => {
        try {
            await apiService.updateProduct(editingProduct._id, editingProduct);
            setEditingProduct(null);
            fetchData();
        } catch (error) {
            console.error('Failed to update product', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    if (loading) {
        return <CircularProgress/>;
    }

    return (
        <div>
            <Typography variant="h6">Add New Product</Typography>
            <TextField label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <TextField label="Price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
            <TextField label="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
            <TextField label="Image URL" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
            <TextField label="Video URL" value={newProduct.videoUrl} onChange={(e) => setNewProduct({ ...newProduct, videoUrl: e.target.value })} />
            <TextField label="Engine Count" type="number" value={newProduct.engineCount} onChange={(e) => setNewProduct({ ...newProduct, engineCount: parseInt(e.target.value) })} />
            <TextField label="Engine Type" value={newProduct.engineType} onChange={(e) => setNewProduct({ ...newProduct, engineType: e.target.value })} />
            <TextField label="Purpose" value={newProduct.purpose} onChange={(e) => setNewProduct({ ...newProduct, purpose: e.target.value })} />
            <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>

            <Typography variant="h6" style={{ marginTop: '20px' }}>Products</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Image URL</TableCell>
                            <TableCell>Video URL</TableCell>
                            <TableCell>Engine Count</TableCell>
                            <TableCell>Engine Type</TableCell>
                            <TableCell>Purpose</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.imageUrl}</TableCell>
                                <TableCell>{product.videoUrl}</TableCell>
                                <TableCell>{product.engineCount}</TableCell>
                                <TableCell>{product.engineType}</TableCell>
                                <TableCell>{product.purpose}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                                    <Button variant="contained" color="primary" onClick={() => handleEditProduct(product)} style={{ marginLeft: '10px' }}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {editingProduct && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6">Edit Product</Typography>
                    <TextField label="Name" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                    <TextField label="Price" type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} />
                    <TextField label="Description" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} />
                    <TextField label="Image URL" value={editingProduct.imageUrl} onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })} />
                    <TextField label="Video URL" value={editingProduct.videoUrl} onChange={(e) => setEditingProduct({ ...editingProduct, videoUrl: e.target.value })} />
                    <TextField label="Engine Count" type="number" value={editingProduct.engineCount} onChange={(e) => setEditingProduct({ ...editingProduct, engineCount: parseInt(e.target.value) })} />
                    <TextField label="Engine Type" value={editingProduct.engineType} onChange={(e) => setEditingProduct({ ...editingProduct, engineType: e.target.value })} />
                    <TextField label="Purpose" value={editingProduct.purpose} onChange={(e) => setEditingProduct({ ...editingProduct, purpose: e.target.value })} />
                    <Button variant="contained" color="primary" onClick={handleUpdateProduct}>Update Product</Button>
                    <Button variant="contained" color="secondary" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel</Button>
                </div>
            )}
        </div>
    );
};

export default ProductManage;
