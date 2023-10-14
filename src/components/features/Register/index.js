import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../common/Button';
import Input from '../../common/Input';
import '../../../styles/register.css';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          setError( 'Toegang geweigerd. Controlleer je toestemmingen of API-sleutel.');
        } else {
          setError(error.response.data || 'Er is een fout opgetreden bij de registratie.');
        }
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}

export default Register;
