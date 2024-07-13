import React, { createContext, useContext, useState, useMemo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const baseUrl = 'https://api.datavortex.nl/countryverkenner';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; 
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('jwtToken');
    return savedToken || null;
  });

  const register = async (username, email, password) => {
    const userData = { username, email, password, info: "testinfo" };
    try {
      await axios.post(`${baseUrl}/users`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'countryverkenner:sn57awrFZpM9VJe6fyKg'
        }
      });
    } catch (error) {
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${baseUrl}/users/authenticate`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
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

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
  };

  const contextValue = useMemo(() => ({ currentUser, token, register, login, logout }), [currentUser, token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);
