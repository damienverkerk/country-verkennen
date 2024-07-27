import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import CountrySelection from '../../components/features/Countries/CountrySelection/CountrySelection';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import InfoBox from '../../components/common/InfoBox/InfoBox';
import './VisitedCountriesPage.css';
import NavigationButtons from '../../components/common/NavigationButtons/NavigationButtons'

const VisitedCountriesPage = () => {
  const { selectedCountries, setSelectedCountries } = useAppState();
  const navigate = useNavigate();

  const handleCountrySelect = (updatedCountries) => {
    setSelectedCountries(updatedCountries);
  };

  const handleNext = () => navigate('/wishlist-countries');
  const handlePrev = () => navigate('/');

  return (
    <PageLayout title="Bezochte Landen">
      <main className="visited-countries-container">
        <InfoBox>
          Selecteer de landen die je hebt bezocht. Dit helpt ons bij het aanbevelen van nieuwe bestemmingen op basis van jouw reiservaringen.
        </InfoBox>
        <CountrySelection 
          selectedCountries={selectedCountries}
          onCountrySelect={handleCountrySelect}
          title="Selecteer Bezochte Landen"
          showScore={false}
        />
        <NavigationButtons 
          onPrevious={handlePrev}
          onNext={handleNext}
          previousLabel="Terug"
          nextLabel="Volgende"
        />
      </main>
    </PageLayout>
  );
};

export default VisitedCountriesPage;