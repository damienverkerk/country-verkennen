import React from 'react';
import CountrySelection from '../CountrySelection';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../../contexts/AppStateContext';
import Button from '../../common/Button';
import Card from '../../common/Card';
import '../../../styles/visitedCountriesPage.css';

const VisitedCountriesPage = () => {
  const { selectedCountries, setSelectedCountries } = useAppState();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/wishlist-countries');
  };

  return (
    <div className="visited-countries-container">
      <Card title="Bezochte Landen">
        <section className="info-section">
          <p>Selecteer de landen die je hebt bezocht. Dit helpt ons bij het aanbevelen van nieuwe bestemmingen op basis van jouw reiservaringen.</p>
        </section>
        <section>
          <CountrySelection 
            selectedCountries={selectedCountries}
            onCountrySelect={setSelectedCountries}
            title="Bezochte Landen"
          />
        </section>
        <section className="buttons-section">
          <Button onClick={handleNext}>Volgende</Button>
        </section>
      </Card>
    </div>
  );
};

export default VisitedCountriesPage;
