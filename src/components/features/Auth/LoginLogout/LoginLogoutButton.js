import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import Button from '../../../common/Button/Button';
import './LoginLogoutButton.css';

const LoginLogoutButton = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-logout-button">
      {currentUser ? (
        <Button onClick={handleLogout}>Log Out</Button>
      ) : (
        <Button onClick={handleLogin}>Log In</Button>
      )}
    </div>
  );
};

export default LoginLogoutButton;