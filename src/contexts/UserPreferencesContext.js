import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const UserPreferencesContext = createContext();

export const UserPreferencesProvider = ({ children }) => {
  const defaultPreferences = {
    prefersCoastal: false,
    prefersMountains: false,
    climate: 'temperate',
  };

  const [preferences, setPreferences] = useState(() => {
    try {
      const storedPreferences = localStorage.getItem('userPreferences');
      return storedPreferences ? JSON.parse(storedPreferences) : defaultPreferences;
    } catch (error) {
      console.error('Er is een fout opgetreden tijdens het parsen van de gebruikersvoorkeuren:', error);
      return defaultPreferences;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Er is een fout opgetreden tijdens het opslaan van de gebruikersvoorkeuren:', error);
    }
  }, [preferences]);

  const contextValue = useMemo(() => ({ preferences, setPreferences }), [preferences]);

  return (
    <UserPreferencesContext.Provider value={contextValue}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

UserPreferencesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useUserPreferences = () => useContext(UserPreferencesContext);
