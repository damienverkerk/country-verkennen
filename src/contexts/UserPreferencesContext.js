import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const defaultPreferences = {
    prefersCoastal: false,
    prefersMountains: false,
    climate: 'temperate', 
  };

  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  return (
    <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

UserPreferencesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useUserPreferences = () => {
  return useContext(UserPreferencesContext);
};
