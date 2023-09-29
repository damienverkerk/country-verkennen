import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../common/Button';
import Input from '../../common/Input';
import '../../../styles/register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    try {
      register(username, email, password);
      navigate('/login'); // Navigeer naar de loginpagina bij succesvolle registratie
    } catch (error) {
      setError(error.message); // Toon een foutmelding indien registratie mislukt
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
