import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import CountrySelection from '../../components/features/Countries/CountrySelection/CountrySelection';
import './VisitedCountriesPage.css';

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
        <CountrySelection 
          selectedCountries={selectedCountries}
          onCountrySelect={setSelectedCountries}
          title="Selecteer Bezochte Landen"
          showScore={false}
        />
        <section className="buttons-section">
          <Button onClick={handleNext}>Volgende</Button>
        </section>
      </Card>
    </div>
  );
};

export default VisitedCountriesPage;