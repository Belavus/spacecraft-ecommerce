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
    Modal,
    CircularProgress,
    Box,
    Stack
} from '@mui/material';
import apiService from "../services/ApiService";

const ProductManage = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
        videoUrl: '',
        engineCount: 0,
        engineType: '',
        purpose: ''
    });
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const [open, setOpen] = useState(false); //Modal product editing

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
            setNewProduct({
                name: '',
                price: 0,
                description: '',
                imageUrl: '',
                videoUrl: '',
                engineCount: 0,
                engineType: '',
                purpose: ''
            });
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

    const handleUpdateProduct = async () => {
        try {
            await apiService.updateProduct(editingProduct._id, editingProduct);
            setOpen(false);
            setEditingProduct(null);
            fetchData();
        } catch (error) {
            console.error('Failed to update product', error);
        }
    };

    //Modal editing
    const handleOpen = (product) => {
        setEditingProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingProduct(null);
    };

    if (loading) {
        return <CircularProgress/>;
    }

    return (
        <Box>
            <Typography mb={3} variant="h6">Add New Product</Typography>
            <Stack spacing={2}>
                <TextField label="Name" value={newProduct.name}
                           onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>
                <TextField label="Description" value={newProduct.description}
                           onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}/>
                <TextField label="Image URL" value={newProduct.imageUrl}
                           onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}/>
                <TextField label="Video URL" value={newProduct.videoUrl}
                           onChange={(e) => setNewProduct({...newProduct, videoUrl: e.target.value})}/>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                    <TextField label="Price" type="number" value={newProduct.price}
                               onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}/>
                    <TextField label="Engine Count" type="number" value={newProduct.engineCount}
                               onChange={(e) => setNewProduct({...newProduct, engineCount: parseInt(e.target.value)})}/>
                    <TextField label="Engine Type" value={newProduct.engineType}
                               onChange={(e) => setNewProduct({...newProduct, engineType: e.target.value})}/>
                    <TextField label="Purpose" value={newProduct.purpose}
                               onChange={(e) => setNewProduct({...newProduct, purpose: e.target.value})}/>
                </Stack>
                <Button color="primary" onClick={handleAddProduct}>Add Product</Button>
            </Stack>

            <Typography mt={5} mb={3} variant="h6">Products</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Actions</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Image URL</TableCell>
                            <TableCell>Video URL</TableCell>
                            <TableCell>Engine Count</TableCell>
                            <TableCell>Engine Type</TableCell>
                            <TableCell>Purpose</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleOpen(product)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" onClick={() => handleDeleteProduct(product._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '250px',
                                    }}
                                    title={product.description}
                                >
                                    {product.description}
                                </TableCell>
                                <TableCell>{product.imageUrl}</TableCell>
                                <TableCell>{product.videoUrl}</TableCell>
                                <TableCell align={"center"}>{product.engineCount}</TableCell>
                                <TableCell>{product.engineType}</TableCell>
                                <TableCell>{product.purpose}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-product-modal"
                aria-describedby="modal-to-edit-product"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="edit-product-modal" variant="h6" component="h2">
                        Edit Product
                    </Typography>
                    <TextField
                        label="Name"
                        value={editingProduct?.name || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={editingProduct?.price || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={editingProduct?.description || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Image URL"
                        value={editingProduct?.imageUrl || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Video URL"
                        value={editingProduct?.videoUrl || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, videoUrl: e.target.value})}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Engine Count"
                        type="number"
                        value={editingProduct?.engineCount || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, engineCount: parseInt(e.target.value)})}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Engine Type"
                        value={editingProduct?.engineType || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, engineType: e.target.value})}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Purpose"
                        value={editingProduct?.purpose || ''}
                        onChange={(e) => setEditingProduct({...editingProduct, purpose: e.target.value})}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdateProduct}
                            style={{marginTop: '16px'}}>
                        Save Changes
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}
                            style={{marginTop: '16px', marginLeft: '10px'}}>
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default ProductManage;
