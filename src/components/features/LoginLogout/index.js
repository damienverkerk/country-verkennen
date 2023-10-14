import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../common/Button';

function LoginLogoutButton() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            {currentUser ? (
                <Button onClick={handleLogout}>Uitloggen</Button>
            ): (
                <Button onClick={() => navigate('/login')}>Inloggen</Button>
            )}
        </div>
    );
}

export default LoginLogoutButton;