import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import api from '../services/api';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(UserContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isAdmin ? '/auth/register-admin' : '/auth/register';
            await api.post(endpoint, { name, email, password, isAdmin }, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            alert('User registered successfully');
        } catch (err) {
            setError('Failed to register user');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Admin</label>
                    <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
