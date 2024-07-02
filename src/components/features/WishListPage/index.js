import React from 'react';
import CountrySelection from '../CountrySelection';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../../contexts/AppStateContext';
import Button from '../../common/Button';
import Card from '../../common/Card';
import '../../../styles/wishlistPage.css';

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
    <div className="wishlist-container">
      <Card title="Wenslijst Landen">
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
      </Card>
    </div>
  );
};

export default WishListPage;
