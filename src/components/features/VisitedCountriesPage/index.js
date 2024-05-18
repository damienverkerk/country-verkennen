import React from 'react';
import CountrySelection from '../CountrySelection';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../../contexts/AppStateContext';
import '../../../styles/visitedCountriesPage.css';

const VisitedCountriesPage = () => {
  const { selectedCountries, setSelectedCountries } = useAppState();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/wishlist-countries');
  };

  return (
    <div className="visited-countries-container">
      <h2>Bezochte Landen</h2>
      <CountrySelection 
        selectedCountries={selectedCountries}
        onCountrySelect={setSelectedCountries}
        title="Bezochte Landen"
      />
      <button onClick={handleNext}>Volgende</button>
    </div>
  );
};

export default VisitedCountriesPage;
