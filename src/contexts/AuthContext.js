import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const baseUrl = 'https://api.datavortex.nl/countryverkenner'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; 
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('jwtToken');
    return savedToken || null;
  });

  // registreren
  const register = async ( username, email, password) => {
  const userData = {
    username: username,
    email: email,
    password: password,
    info: "testinfo"
  };
  
  try {
    const response = await axios.post(`${baseUrl}/users`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'countryverkenner:sn57awrFZpM9VJe6fyKg'
      }
    });
  } catch (error) {
    throw error;
  }
  };

  //login
  const login = async (username, password) => {
    try{
      const response = await axios.post(`${baseUrl}/users/authenticate`, {username, password}, {
        headers: {
          'Context-Type': 'application/json',
          'X-Api-Key': 'countryverkenner:sn57awrFZpM9VJe6fyKg'
        }
      });

      const token = response.data.token;
      setToken(token);
      localStorage.setItem('jwtToken', token);
      
      setCurrentUser({ username });
      localStorage.setItem('user', JSON.stringify({ username }));
    } catch (error) {
      throw error;
    } 
  };

  //logout
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
  }
  
  return (
    <AuthContext.Provider value={{ currentUser, token, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)