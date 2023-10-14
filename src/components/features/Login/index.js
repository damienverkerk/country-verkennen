import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../common/Button';
import Input from '../../common/Input';
import '../../../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate('/'); // Navigeer naar de homepagina bij succesvolle login
    } catch (error) {
      if (error.response) {
        setError(error.response.data || 'Er is een fout opgetreden bij het inloggen.');
      } else{
      setError(error.message); // Toon een foutmelding indien login mislukt
      }
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default Login;
