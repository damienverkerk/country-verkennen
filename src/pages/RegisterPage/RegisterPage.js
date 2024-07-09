import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button/Button';
import FormField from '../../components/common/FormField/FormField';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      await register(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account');
    }
  };

  return (
    <PageLayout title="Register">
      <div className="register-page">
        <form onSubmit={handleSubmit} className="register-form">
          <FormField
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormField
            label="Confirm Password"
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit">Register</Button>
        </form>
        <ErrorMessage message={error} />
      </div>
    </PageLayout>
  );
};

export default RegisterPage;