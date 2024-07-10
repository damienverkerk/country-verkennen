import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import CountryCard from '../../components/features/Countries/CountryCard/CountryCard';
import Button from '../../components/common/Button/Button';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import './Dashboard.css';
import PropTypes from 'prop-types';

const Dashboard = ({ allCountries, calculateMatchScore }) => {
  const { filters, selectedCountries, wishListCountries } = useAppState();
  const navigate = useNavigate();

  const visitedCount = selectedCountries.length;
  const wishListCount = wishListCountries.length;
  const totalCountries = allCountries.length;

  const handleStartExploring = () => {
    navigate('/filters');
  };

  const handleViewWishlist = () => {
    navigate('/wishlist-countries');
  };

  const handleViewVisited = () => {
    navigate('/visited-countries');
  };

  return (
    <PageLayout title="Welkom bij jouw Reisavontuur">
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Bezochte Landen</h3>
          <p className="stat-number">{visitedCount}</p>
          <p>van de {totalCountries} landen</p>
          <Button onClick={handleViewVisited}>Bekijk Bezocht</Button>
        </div>
        <div className="stat-card">
          <h3>Verlanglijst</h3>
          <p className="stat-number">{wishListCount}</p>
          <p>landen om te ontdekken</p>
          <Button onClick={handleViewWishlist}>Bekijk Verlanglijst</Button>
        </div>
      </div>

      <div className="dashboard-actions">
        <h2>Klaar voor je volgende avontuur?</h2>
        <Button onClick={handleStartExploring} className="primary-button">
          Start met Verkennen
        </Button>
      </div>

      {visitedCount > 0 && (
        <div className="dashboard-recap">
          <h2>Jouw Reisherinneringen</h2>
          <p>Je hebt al {visitedCount} prachtige bestemmingen bezocht. Hier zijn je bezochte landen:</p>
          <div className="visited-countries-grid">
            {selectedCountries.map(country => (
              <CountryCard
                key={country.cca3}
                country={country}
                onSelect={() => {}}
                showScore={false}
                showRemoveButton={false}
              />
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

Dashboard.propTypes = {
  allCountries: PropTypes.arrayOf(PropTypes.object).isRequired,
  calculateMatchScore: PropTypes.func.isRequired
};

export default Dashboard;
