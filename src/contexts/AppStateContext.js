import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [wishListCountries, setWishListCountries] = useState([]);
  const [filters, setFilters] = useState({
    language: '',
    region: '',
    subregion: '',
    currency: '',
    population: 1000000000,
    area: 17098242,
    landlocked: undefined
  });

  return (
    <AppStateContext.Provider value={{ 
      selectedCountries, 
      setSelectedCountries, 
      wishListCountries, 
      setWishListCountries, 
      filters, 
      setFilters 
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAppState = () => useContext(AppStateContext);
