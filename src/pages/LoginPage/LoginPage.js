import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import AuthForm from '../../components/common/AuthForm/AuthForm';
import Button from '../../components/common/Button/Button';
import './LoginPage.css';

function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (username, password, email) => {
    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, email, password);
        await login(username, password);
      }
      navigate('/');
    } catch (error) {
      console.error(isLogin ? 'Login failed' : 'Registration failed', error);
      throw new Error(error.message);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <PageLayout title={isLogin ? "Login" : "Register"}>
      <main>
        <AuthForm
          onSubmit={handleAuth}
          submitButtonText={isLogin ? "Login" : "Register"}
          fields={isLogin ? [
            { name: 'username', label: 'Username', type: 'text', minLength: 3 },
            { name: 'password', label: 'Password', type: 'password', minLength: 6 }
          ] : [
            { name: 'username', label: 'Username', type: 'text', minLength: 3 },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password', minLength: 6 }
          ]}
        />
        <Button onClick={toggleAuthMode}>
          {isLogin ? "Need an account? Register" : "Already have an account? Login"}
        </Button>
      </main>
    </PageLayout>
  );
}

export default LoginPage;