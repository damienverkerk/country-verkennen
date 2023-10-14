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
    return localStorage.getItem('jwtToken');
  });

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

  //logout

  return (
    <AuthContext.Provider value={{ currentUser, token, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)