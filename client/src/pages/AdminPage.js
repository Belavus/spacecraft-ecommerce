import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Tabs, Tab, Box, Typography, CircularProgress } from '@mui/material';
import UserManage from '../components/UserManage';
import ProductManage from '../components/ProductManage';
import HomePageManage from '../components/HomePageManage';
import { useNavigate } from 'react-router-dom';
import apiService from "../services/ApiService";

const AdminPage = () => {
    const { user } = useContext(UserContext);
    const [selectedTab, setSelectedTab] = useState(0);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);


    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div>
            <Typography variant="h4">Admin Page</Typography>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Admin Tabs">
                <Tab label="Manage Users" />
                <Tab label="Manage Products" />
                <Tab label="Manage HomePage" />
            </Tabs>
            <Box sx={{ marginTop: 3 }}>
                {selectedTab === 0 && <UserManage/>}
                {selectedTab === 1 && <ProductManage/>}
                {selectedTab === 2 && <HomePageManage />}
            </Box>
        </div>
    );
};

export default AdminPage;