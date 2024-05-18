import React from 'react';
import CountrySelection from '../CountrySelection';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../../contexts/AppStateContext';
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
      <h2>Wenslijst Landen</h2>
      <CountrySelection 
        selectedCountries={wishListCountries}
        onCountrySelect={setWishListCountries}
        title="Wenslijst Landen"
      />
      <button onClick={handlePrev}>Terug</button>
      <button onClick={handleNext}>Volgende</button>
    </div>
  );
};

export default WishListPage;
