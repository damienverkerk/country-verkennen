import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

function LoginLogoutButton() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-logout">
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
