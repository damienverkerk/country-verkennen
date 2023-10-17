import React, { createContext, useState, useEffect, useContext } from 'react';

const FavoriteCountriesContext = createContext();

export const FavoriteCountriesProvider = ({ children }) => {
  const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const [favorites, setFavorites] = useState(initialFavorites);

  // Sla favorieten op in localStorage wanneer ze veranderen
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

export const useFavoriteCountries = () => {
  return useContext(FavoriteCountriesContext);
};
