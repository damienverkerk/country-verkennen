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

  const handleRegister = async () => {
    const baseUrl = "https://api.datavortex.nl/Countryverkenner";
  
    const userData = {
      username: username,
      email: email,
      password: password,
      info: "testinfo"
    };

    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        Headers: {
          'Content-Type': 'application/json',
          'X-Api-Key':'countryverkenner:sn57awrFZpM9VJe6fyKg'
      },
        body: JSON.stringify(userData)
      });

      if(response.ok) {
        const contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
        }
        navigate('/login');
      } else{
        const responseData = await response.json();
        throw new Error(responseData.message || "Registratie mislukt!");
      }
    } catch (error) {
      setError(error.message);
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
