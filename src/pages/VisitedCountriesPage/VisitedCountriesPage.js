import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import Button from '../../components/common/Button/Button';
import CountrySelection from '../../components/features/Countries/CountrySelection/CountrySelection';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import InfoBox from '../../components/common/InfoBox/InfoBox';
import './VisitedCountriesPage.css';

const VisitedCountriesPage = () => {
  const { selectedCountries, setSelectedCountries } = useAppState();
  const navigate = useNavigate();

  const handleCountrySelect = (updatedCountries) => {
    console.log('Updated selected countries:', updatedCountries);
    setSelectedCountries(updatedCountries);
  };

  const handleNext = () => {
    navigate('/wishlist-countries');
  };

  return (
    <PageLayout title="Bezochte Landen">
      <main>
        <InfoBox>
          Selecteer de landen die je hebt bezocht. Dit helpt ons bij het aanbevelen van nieuwe bestemmingen op basis van jouw reiservaringen.
        </InfoBox>
        <CountrySelection 
          selectedCountries={selectedCountries}
          onCountrySelect={handleCountrySelect}
          title="Selecteer Bezochte Landen"
          showScore={false}
        />
      </main>
      <footer className="buttons-section">
        <Button onClick={() => navigate(-1)}>Terug</Button>
        <Button onClick={handleNext}>Volgende</Button>
      </footer>
    </PageLayout>
  );
};

export default VisitedCountriesPage;
