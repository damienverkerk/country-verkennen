import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const FavoriteCountriesContext = createContext();

export const FavoriteCountriesProvider = ({ children }) => {
  const initialFavorites = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    } catch (error) {
      console.error('Er is een fout opgetreden tijdens het parsen van de favorieten:', error);
      return [];
    }
  }, []);

  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Er is een fout opgetreden tijdens het opslaan in de localStorage:', error);
    }
  }, [favorites]);

  const contextValue = useMemo(() => ({ favorites, setFavorites }), [favorites]);

  return (
    <FavoriteCountriesContext.Provider value={contextValue}>
      {children}
    </FavoriteCountriesContext.Provider>
  );
};

FavoriteCountriesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useFavoriteCountries = () => useContext(FavoriteCountriesContext);
