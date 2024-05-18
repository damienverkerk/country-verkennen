import React, { useState, useEffect } from 'react';
import CountrySelection from '../CountrySelection';
import CountryList from '../CountryList';
import CountryFilters from '../CountryFilters';
import InteractiveMap from '../InteractiveMap';
import CountryDetail from '../CountryDetail';
import '../../../styles/dashboard.css';
import useCountries from '../../../hooks/useCountries';
import { calculateMatchScore } from '../../../utils/calculateMatchScore';

const Dashboard = () => {
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
  const [step, setStep] = useState(1);
  const [allCountries] = useCountries();
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);

  const handleCountrySelect = (selectedCountries) => {
    console.log('Selected countries:', selectedCountries);
    setSelectedCountries(selectedCountries);
  };

  const handleWishListSelect = (wishListCountries) => {
    console.log('Wish list countries:', wishListCountries);
    setWishListCountries(wishListCountries);
  };

  const handleFilterChange = (filterKey, value) => {
    console.log(`Filter changed: ${filterKey} = ${value}`);
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterKey]: value
    }));
  };

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep(prevStep => (prevStep > 1 ? prevStep - 1 : 1));
  };

  const handleCountryDetailSelect = (countryCode) => {
    setSelectedCountryCode(countryCode);
  };

  const getScoredCountries = (countries) => {
    return countries.map(country => ({
      ...country,
      score: calculateMatchScore(country, filters, selectedCountries, wishListCountries)
    })).sort((a, b) => b.score - a.score);
  };

  useEffect(() => {
    if (allCountries && allCountries.length > 0) {
      const scoredCountries = getScoredCountries(allCountries);
      setFilteredCountries(scoredCountries);
    }
  }, [allCountries, filters, selectedCountries, wishListCountries]);

  useEffect(() => {
    console.log('Filtered countries:', filteredCountries);
  }, [filteredCountries]);

  return (
    <div className="dashboard-container">
      {step === 1 && (
        <section className="dashboard-section">
          <h2>Bezochte Landen</h2>
          <CountrySelection 
            selectedCountries={selectedCountries}
            onCountrySelect={handleCountrySelect}
            title="Bezochte Landen"
          />
          <button onClick={handleNextStep}>Volgende</button>
        </section>
      )}

      {step === 2 && (
        <section className="dashboard-section">
          <h2>Wenslijst Landen</h2>
          <CountrySelection 
            selectedCountries={wishListCountries}
            onCountrySelect={handleWishListSelect}
            title="Wenslijst Landen"
          />
          <button onClick={handlePrevStep}>Terug</button>
          <button onClick={handleNextStep}>Volgende</button>
        </section>
      )}

      {step === 3 && (
        <section className="dashboard-section">
          <h2>Filters</h2>
          <CountryFilters onFilterChange={handleFilterChange} />
          <button onClick={handlePrevStep}>Terug</button>
          <button onClick={handleNextStep}>Volgende</button>
        </section>
      )}

      {step === 4 && (
        <section className="dashboard-section">
          <h2>Resultaten</h2>
          {selectedCountryCode ? (
            <CountryDetail 
              countryCode={selectedCountryCode} 
              selectedCountries={selectedCountries.map(country => country.cca3)}
              topCountries={filteredCountries.slice(0, 10)}
            />
          ) : (
            <>
              <CountryList 
                countries={filteredCountries} 
                filters={filters} 
                onCountrySelect={handleCountryDetailSelect} 
              />
              <InteractiveMap 
                selectedCountries={selectedCountries.map(country => country.cca3)} 
                topCountries={filteredCountries.slice(0, 10)} 
              />
            </>
          )}
          <button onClick={handlePrevStep}>Terug</button>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
