import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import api from '../services/api';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AdminPage = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', isAdmin: false });
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '', imageUrl: '', videoUrl: '' });

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const userRes = await api.get('/admin/users', {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    setUsers(userRes.data);

                    const productRes = await api.get('/products');
                    setProducts(productRes.data);
                } catch (error) {
                    console.error('Failed to fetch data', error);
                }
            }
        };
        fetchData();
    }, [user]); // Объединенный useEffect для загрузки данных

    const handleRegisterUser = async () => {
        try {
            await api.post('/auth/register-admin', newUser, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setNewUser({ name: '', email: '', password: '', isAdmin: false });
            const res = await api.get('/admin/users', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setUsers(res.data);
        } catch (error) {
            console.error('Failed to register user', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await api.delete(`/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const res = await api.get('/admin/users', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setUsers(res.data);
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    const handleAddProduct = async () => {
        try {
            await api.post('/admin/products', newProduct, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setNewProduct({ name: '', price: 0, description: '', imageUrl: '', videoUrl: '' });
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Failed to add product', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        console.log(user);
        try {
            await api.delete(`/admin/products/${productId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    return (
        <div>
            <Typography variant="h4">Admin Page</Typography>

            <div>
                <Typography variant="h6">Register New User</Typography>
                <TextField label="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                <TextField label="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <TextField label="Password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                <Button variant="contained" color="primary" onClick={handleRegisterUser}>Register</Button>
            </div>

            <div>
                <Typography variant="h6">Users</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Admin</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div>
                <Typography variant="h6">Add New Product</Typography>
                <TextField label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <TextField label="Price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
                <TextField label="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                <TextField label="Image URL" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
                <TextField label="Video URL" value={newProduct.videoUrl} onChange={(e) => setNewProduct({ ...newProduct, videoUrl: e.target.value })} />
                <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
            </div>

            <div>
                <Typography variant="h6">Products</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Image URL</TableCell>
                                <TableCell>Video URL</TableCell>
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
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default AdminPage;
