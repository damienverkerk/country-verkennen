import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const FavoriteCountriesContext = createContext();

export const FavoriteCountriesProvider = ({ children }) => {
  const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Er is een fout opgetreden tijdens het opslaan in de localStorage:', error);
    }
  }, [favorites]);

  return (
    <FavoriteCountriesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteCountriesContext.Provider>
  );
};

FavoriteCountriesProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useFavoriteCountries = () => {
  return useContext(FavoriteCountriesContext);
};
