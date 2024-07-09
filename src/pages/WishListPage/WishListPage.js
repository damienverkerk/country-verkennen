import React from 'react';
import CountrySelection from '../../components/features/Countries/CountrySelection/CountrySelection';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import './WishListPage.css';
import PropTypes from 'prop-types';

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

WishListPage.propTypes = {
  wishListCountries: PropTypes.arrayOf(PropTypes.object).isRequired,
  setWishListCountries: PropTypes.func.isRequired
};

export default WishListPage;