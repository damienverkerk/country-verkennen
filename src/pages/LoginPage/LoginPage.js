import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button/Button';
import Form from '../../components/common/Form/Form';
import FormField from '../../components/common/FormField/FormField';
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import './LoginPage.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <PageLayout title="Login">
      {error && <ErrorMessage message={error} />}
      <Form onSubmit={handleSubmit}>
        <FormField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required minLength="3" />
        <FormField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
        <Button type="submit">Login</Button>
      </Form>
    </PageLayout>
  );
}

export default Login;
