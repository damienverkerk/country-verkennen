import React, { createContext, useState, useContext, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [selectedCountries, setSelectedCountries] = useState(() => {
    const saved = localStorage.getItem('selectedCountries');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishListCountries, setWishListCountries] = useState(() => {
    const saved = localStorage.getItem('wishListCountries');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookedTrips, setBookedTrips] = useState(() => {
    const saved = localStorage.getItem('bookedTrips');
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState({
    language: '',
    region: '',
    subregion: '',
    currency: '',
    population: 1000000000,
    area: 17098242,
    landlocked: undefined
  });

  const [userPreferences, setUserPreferences] = useState(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : {
      prefersCoastal: false,
      prefersMountains: false,
      climate: 'temperate',
    };
  });

  useEffect(() => {
    localStorage.setItem('selectedCountries', JSON.stringify(selectedCountries));
  }, [selectedCountries]);

  useEffect(() => {
    localStorage.setItem('wishListCountries', JSON.stringify(wishListCountries));
  }, [wishListCountries]);

  useEffect(() => {
    localStorage.setItem('bookedTrips', JSON.stringify(bookedTrips));
  }, [bookedTrips]);

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  const addSelectedCountry = useCallback((country) => {
    setSelectedCountries(prev => [...prev, country]);
  }, []);

  const removeSelectedCountry = useCallback((countryCode) => {
    setSelectedCountries(prev => prev.filter(country => country.cca3 !== countryCode));
  }, []);

  const addWishListCountry = useCallback((country) => {
    setWishListCountries(prev => [...prev, country]);
  }, []);

  const removeWishListCountry = useCallback((countryCode) => {
    setWishListCountries(prev => prev.filter(country => country.cca3 !== countryCode));
  }, []);

  const addBookedTrip = useCallback((trip) => {
    const tripWithId = { ...trip, id: Date.now().toString() };
    setBookedTrips(prev => [...prev, tripWithId]);
  }, []);

  const removeBookedTrip = useCallback((tripId) => {
    setBookedTrips(prev => prev.filter(trip => trip.id !== tripId));
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const updateUserPreferences = useCallback((newPreferences) => {
    setUserPreferences(prev => ({ ...prev, ...newPreferences }));
  }, []);

  const value = useMemo(() => ({
    selectedCountries,
    setSelectedCountries, 
    addSelectedCountry,
    removeSelectedCountry,
    wishListCountries,
    setWishListCountries, 
    addWishListCountry,
    removeWishListCountry,
    bookedTrips,
    addBookedTrip,
    removeBookedTrip,
    filters,
    updateFilters,
    userPreferences,
    updateUserPreferences
  }), [
    selectedCountries,
    setSelectedCountries, 
    wishListCountries,
    setWishListCountries, 
    bookedTrips,
    filters,
    userPreferences,
    addSelectedCountry,
    removeSelectedCountry,
    addWishListCountry,
    removeWishListCountry,
    addBookedTrip,
    removeBookedTrip,
    updateFilters,
    updateUserPreferences
  ]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export default AppStateProvider;