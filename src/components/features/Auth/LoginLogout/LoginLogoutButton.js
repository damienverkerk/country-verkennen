import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import Button from '../../../common/Button/Button';
import useLogout from '../../../../hooks/useLogout';


const LoginLogoutButton = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="login-logout-button" aria-label="User authentication">
      {currentUser ? (
        <Button onClick={handleLogout} className="btn login-logout-btn" aria-label="Log out">Log Out</Button>
      ) : (
        <Button onClick={handleLogin} className="btn login-logout-btn" aria-label="Log in">Log In</Button>
      )}
    </nav>
  );
};

export default LoginLogoutButton;