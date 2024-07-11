import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import Button from '../../components/common/Button/Button';
import CountrySelection from '../../components/features/Countries/CountrySelection/CountrySelection';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import InfoBox from '../../components/common/InfoBox/InfoBox';
import './WishListPage.css';

const WishListPage = () => {
  const { wishListCountries, setWishListCountries } = useAppState();
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/filters');
  };

  const handlePrev = () => {
    navigate('/visited-countries');
  };

  return (
    <PageLayout title="Wenslijst Landen">
      <main>
        <InfoBox>
          Selecteer de landen die je graag zou willen bezoeken. Dit helpt ons bij het aanbevelen van nieuwe bestemmingen op basis van jouw voorkeuren.
        </InfoBox>
        <CountrySelection 
          selectedCountries={wishListCountries}
          onCountrySelect={setWishListCountries}
          title="Wenslijst Landen"
        />
      </main>
      <footer className="buttons-section">
        <Button onClick={handlePrev}>Terug</Button>
        <Button onClick={handleNext}>Volgende</Button>
      </footer>
    </PageLayout>
  );
};

export default WishListPage;
