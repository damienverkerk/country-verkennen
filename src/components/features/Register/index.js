import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../common/Button';
import Form from '../../common/Form';
import FormField from '../../common/FormField';
import '../../../styles/register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is not valid');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await register(username, email, password);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setError('Toegang geweigerd. Controleer je toestemmingen of API-sleutel.');
        } else {
          setError(error.response.data || 'Er is een fout opgetreden bij de registratie.');
        }
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <main className="register">
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <FormField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required minLength="3" />
        <FormField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <FormField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
        <Button type="submit">Register</Button>
      </Form>
    </main>
  );
}

export default Register;
