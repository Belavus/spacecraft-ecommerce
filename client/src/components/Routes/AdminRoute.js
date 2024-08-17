import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user && user.isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
