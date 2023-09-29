import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]); // Voor registratie
  const [currentUser, setCurrentUser] = useState(() => {
    // Probeer de gebruiker te laden uit de local storage wanneer de applicatie start
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }); // Voor inloggen
  
  const register = (username, email, password) => {
    // Check of de gebruiker al bestaat
    if(users.some(user => user.username === username || user.email === email))
      throw new Error('Username or Email already exists');
      
    setUsers([...users, { username, email, password }]);
    // Je kan de gebruiker automatisch inloggen na registratie indien gewenst.
  };
  
  const login = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    if(!user) throw new Error('Invalid Username or Password');
    
    // Sla de ingelogde gebruiker op in de context en in de local storage
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  const logout = () => {
    // Verwijder de gebruiker uit de context en wis de local storage
    setCurrentUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
