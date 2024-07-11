import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import AuthForm from '../../components/common/AuthForm/AuthForm';
import './RegisterPage.css';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    try {
      await register(email, password);
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
      throw new Error('Failed to create an account');
    }
  };

  return (
    <PageLayout title="Register">
      <main className="register-page">
        <AuthForm
          onSubmit={handleRegister}
          submitButtonText="Register"
          fields={[
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
          ]}
        />
      </main>
    </PageLayout>
  );
};

export default RegisterPage;
