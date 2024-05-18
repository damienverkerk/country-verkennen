import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopCountries from '../TopCountries';
import CountryList from '../CountryList';
import InteractiveMap from '../InteractiveMap';
import { useAppState } from '../../../contexts/AppStateContext';
import '../../../styles/dashboard.css';

const Dashboard = ({ allCountries, calculateMatchScore }) => {
  const { filters, selectedCountries, wishListCountries } = useAppState();
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    if (allCountries && allCountries.length > 0) {
      const scoredCountries = allCountries.map(country => ({
        ...country,
        score: calculateMatchScore(country, filters, selectedCountries, wishListCountries)
      })).sort((a, b) => b.score - a.score);
      setFilteredCountries(scoredCountries);
    }
  }, [allCountries, filters, selectedCountries, wishListCountries]);

  return (
    <div className="dashboard-container">
      <h2>Welkom bij de Landen Verkenner</h2>
      <TopCountries countries={filteredCountries.slice(0, 3)} />
      <nav>
        <Link to="/visited-countries">Bezochte Landen</Link>
        <Link to="/wishlist-countries">Wenslijst Landen</Link>
        <Link to="/filters">Filters</Link>
      </nav>
      <CountryList 
        countries={filteredCountries} 
      />
      <InteractiveMap 
        selectedCountries={selectedCountries.map(country => country.cca3)} 
        topCountries={filteredCountries.slice(0, 10)} 
      />
    </div>
  );
};

export default Dashboard;
