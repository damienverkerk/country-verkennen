import React, { useEffect, useState } from 'react';
import CountryList from '../CountryList';
import InteractiveMap from '../InteractiveMap';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../../contexts/AppStateContext';
import '../../../styles/resultsPage.css';

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

  return (
    <div className="results-container">
        <h2>Resultaten</h2>
        <CountryList 
          countries={filteredCountries} 
          onCountrySelect={handleCountrySelect} 
        />
      <section className="results-section">
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

export default ResultsPage;
 