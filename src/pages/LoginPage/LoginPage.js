import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button/Button';
import Form from '../../components/common/Form/Form';
import FormField from '../../components/common/FormField/FormField';
import './LoginPage.css';
import PropTypes from 'prop-types';

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
      if (error.response) {
        setError(error.response.data || 'Er is een fout opgetreden bij het inloggen.');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <main className="login">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <FormField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required minLength="3" />
        <FormField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
        <Button type="submit">Login</Button>
      </Form>
    </main>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default Login;