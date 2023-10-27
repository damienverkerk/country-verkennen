import React from 'react';
import Button from '../../common/Button'; 

import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginLogoutButton() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div>
            {currentUser ? (
                <Button onClick={handleLogout}>Uitloggen</Button>
            ) : (
                <>
                    <Button onClick={handleLoginClick}>Inloggen</Button>
                    <Button onClick={handleRegisterClick}>Registreren</Button>
                </>
            )}
        </div>
    );
}

export default LoginLogoutButton;
