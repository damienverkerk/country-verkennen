import React, { useState } from 'react';
import Button from '../../common/Button'; 
import Modal from '../../common/Modal'; 

import Login from '../Login';
import Register from '../Register';

import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginLogoutButton() {
    const { currentUser, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <div>
            {currentUser ? (
                <Button onClick={handleLogout}>Uitloggen</Button>
            ) : (
                <>
                    <Button onClick={() => setShowLogin(true)}>Inloggen</Button>
                    <Button onClick={() => setShowRegister(true)}>Registreren</Button>

                    <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
                        <Login />
                    </Modal>

                    <Modal isOpen={showRegister} onClose={() => setShowRegister(false)}>
                        <Register />
                    </Modal>
                </>
            )}
        </div>
    );
}

export default LoginLogoutButton;
