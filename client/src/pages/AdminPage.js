import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Tab, Box, Typography, CircularProgress } from '@mui/material';
import UserManage from '../components/UserManage';
import ProductManage from '../components/ProductManage';
import HomePageManage from '../components/HomePageManage';
import Statistics from '../components/Statistics';

const AdminPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

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
                <Tab label="Statistics" />
            </Tabs>
            <Box sx={{ marginTop: 3 }}>
                {selectedTab === 0 && <UserManage/>}
                {selectedTab === 1 && <ProductManage/>}
                {selectedTab === 2 && <HomePageManage />}
                {selectedTab === 3 && <Statistics />}
            </Box>
        </div>
    );
};

export default AdminPage;