import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const ProfilePage = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Please log in</p>
            )}
        </div>
    );
};

export default ProfilePage;
