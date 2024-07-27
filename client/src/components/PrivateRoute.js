import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>; // Можно заменить на компонент загрузки
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
