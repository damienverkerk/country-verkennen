import React, { useEffect, useState } from 'react';
import TopCountries from '../../components/features/Countries/TopCountries/TopCountries';
import CountryList from '../../components/features/Countries/CountryList/CountryList';
import InteractiveMap from '../../components/features/Map/InteractiveMap';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import './ResultsPage.css';
import PropTypes from 'prop-types';

const ResultsPage = ({ allCountries, calculateMatchScore }) => {
  const { filters, selectedCountries, wishListCountries } = useAppState();
  const [filteredCountries, setFilteredCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (allCountries && allCountries.length > 0) {
      const scoredCountries = allCountries.map(country => ({
        ...country,
        score: calculateMatchScore(country, filters, selectedCountries, wishListCountries)
      })).sort((a, b) => b.score - a.score);
      setFilteredCountries(scoredCountries);
    }
  }, [allCountries, filters, selectedCountries, wishListCountries]);

  const handleCountrySelect = (countryCode) => {
    navigate(`/country/${countryCode}`);
  };

  const topCountries = filteredCountries.slice(0, 3);
  const nextCountries = filteredCountries.slice(3, 19);

  return (
    <div className="results-container">
      <section className="results-section">
        <h2>Top 3 Landen</h2>
        <TopCountries 
          countries={topCountries} 
          onCountrySelect={handleCountrySelect} 
        />
      </section>
      <section className="results-section">
        <h2>Andere Landen</h2>
        <CountryList 
          countries={nextCountries} 
          onCountrySelect={handleCountrySelect} 
        />
      </section>
      <section className="results-section map-container">
        <InteractiveMap 
          selectedCountries={selectedCountries.map(country => country.cca3)} 
          topCountries={filteredCountries.slice(0, 10)} 
        />
      </section>
      <section className="results-section buttons-section">
        <button onClick={() => navigate('/filters')}>Terug</button>
        <button onClick={() => navigate('/')}>Dashboard</button>
      </section>
    </div>
  );
};

ResultsPage.propTypes = {
  allCountries: PropTypes.arrayOf(PropTypes.object).isRequired,
  calculateMatchScore: PropTypes.func.isRequired
};

export default ResultsPage;