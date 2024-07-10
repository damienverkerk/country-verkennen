import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import CountrySelection from '../../components/features/Countries/CountrySelection/CountrySelection';
import PageLayout from '../../components/common/PageLayout/PageLayout';
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
      <section className="info-section">
        <p>Selecteer de landen die je graag zou willen bezoeken. Dit helpt ons bij het aanbevelen van nieuwe bestemmingen op basis van jouw voorkeuren.</p>
      </section>
      <section>
        <CountrySelection 
          selectedCountries={wishListCountries}
          onCountrySelect={setWishListCountries}
          title="Wenslijst Landen"
        />
      </section>
      <section className="buttons-section">
        <Button onClick={handlePrev}>Terug</Button>
        <Button onClick={handleNext}>Volgende</Button>
      </section>
    </PageLayout>
  );
};

export default WishListPage;
