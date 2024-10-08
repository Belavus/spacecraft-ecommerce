import React, { useEffect, useState } from 'react';
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
    CircularProgress,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import apiService from "../services/ApiService";

const UserManage = () => {
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', isAdmin: false });
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
            const userRes = await apiService.getUsers();
            setUsers(userRes.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRegisterUser = async () => {
        try {
            await apiService.registerAdmin(newUser);
            setNewUser({ name: '', email: '', password: '', isAdmin: false });
            await fetchData();
        } catch (error) {
            console.error('Failed to register user', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await apiService.deleteUser(userId);
            await fetchData();
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    const handleCheckboxChange = (event) => {
        setNewUser({ ...newUser, isAdmin: event.target.checked });
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <Typography variant="h6">Register New User</Typography>
            <TextField
                label="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={newUser.isAdmin}
                        onChange={handleCheckboxChange}
                        color="primary"
                    />
                }
                label="Admin"
            />
            <Button variant="contained" color="primary" onClick={handleRegisterUser} style={{ marginTop: '10px' }}>Register</Button>

            <Typography variant="h6" style={{ marginTop: '20px' }}>Users</Typography>
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
    );
};

export default UserManage;
