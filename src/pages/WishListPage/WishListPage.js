import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import CountrySelection from '../../components/features/Countries/CountrySelection/CountrySelection';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import InfoBox from '../../components/common/InfoBox/InfoBox';
import NavigationButtons from '../../components/common/NavigationButtons/NavigationButtons';
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
      <main className="wishlist-container">
        <InfoBox>
          Selecteer de landen die je graag zou willen bezoeken. Dit helpt ons bij het aanbevelen van nieuwe bestemmingen op basis van jouw voorkeuren.
        </InfoBox>
        <CountrySelection 
          selectedCountries={wishListCountries}
          onCountrySelect={setWishListCountries}
          title="Wenslijst Landen"
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

export default WishListPage;