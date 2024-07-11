import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import AuthForm from '../../components/common/AuthForm/AuthForm';
import './LoginPage.css';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      throw new Error(error.message);
    }
  };

  return (
    <PageLayout title="Login">
      <main>
        <AuthForm
          onSubmit={handleLogin}
          submitButtonText="Login"
          fields={[
            { name: 'username', label: 'Username', type: 'text', minLength: 3 },
            { name: 'password', label: 'Password', type: 'password', minLength: 6 }
          ]}
        />
      </main>
    </PageLayout>
  );
}

export default LoginPage;
