import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const { data } = await api.get('/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch user profile', error);
                logout();
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        fetchUserProfile();
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };