import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            try {
                const { data } = await api.get('/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser({ ...data, token });
            } catch (error) {
                console.error('Failed to fetch user profile', error);
                logout();
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const login = (token, rememberMe) => {
        if (rememberMe) {
            localStorage.setItem('token', token);
        } else {
            sessionStorage.setItem('token', token);
        }
        fetchUserProfile();
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
