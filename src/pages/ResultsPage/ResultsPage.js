import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TopCountries from '../../components/features/Countries/TopCountries/TopCountries';
import CountryList from '../../components/features/Countries/CountryList/CountryList';
import InteractiveMap from '../../components/features/Map/InteractiveMap';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import Button from '../../components/common/Button/Button';
import './ResultsPage.css';

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
  }, [allCountries, filters, selectedCountries, wishListCountries, calculateMatchScore]);

  const handleCountrySelect = (countryCode) => {
    navigate(`/country/${countryCode}`);
  };

  const topCountries = filteredCountries.slice(0, 3);
  const nextCountries = filteredCountries.slice(3, 23);

  return (
    <PageLayout title="Results">
      <main>
        <section aria-labelledby="top-countries-header">
          <TopCountries 
            countries={topCountries} 
            onCountrySelect={handleCountrySelect} 
          />
        </section>
        <section aria-labelledby="other-countries-header">
          <CountryList 
            countries={nextCountries} 
            onCountrySelect={handleCountrySelect} 
          />
        </section>
        <section aria-labelledby="map-header" className="map-container">
          <InteractiveMap 
            selectedCountries={selectedCountries.map(country => country.cca3)} 
            topCountries={filteredCountries.slice(0, 10)} 
          />
        </section>
      </main>
      <footer className="buttons-section">
        <Button onClick={() => navigate('/filters')}>Terug</Button>
        <Button onClick={() => navigate('/')}>Dashboard</Button>
      </footer>
    </PageLayout>
  );
};

ResultsPage.propTypes = {
  allCountries: PropTypes.array.isRequired,
  calculateMatchScore: PropTypes.func.isRequired
};

export default ResultsPage;
