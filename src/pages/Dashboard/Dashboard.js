import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import CountryCard from '../../components/features/Countries/CountryCard/CountryCard';
import Button from '../../components/common/Button/Button';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import StatCard from '../../components/common/StatCard/StatCard';
import ActionSection from '../../components/common/ActionSection/ActionSection';
import './Dashboard.css';

const Dashboard = ({ allCountries }) => {
  const { selectedCountries, wishListCountries } = useAppState();
  const navigate = useNavigate();

  const visitedCount = selectedCountries.length;
  const wishListCount = wishListCountries.length;
  const totalCountries = allCountries.length;

  const handleStartExploring = () => navigate('/filters');
  const handleViewWishlist = () => navigate('/wishlist-countries');
  const handleViewVisited = () => navigate('/visited-countries');

  return (
    <PageLayout title="Welkom bij jouw Reisavontuur">
      <section className="dashboard-stats" aria-labelledby="stats-title">
        <h2 id="stats-title" className="visually-hidden">Reis Statistieken</h2>
        <StatCard 
          title="Bezochte Landen"
          value={visitedCount}
          total={totalCountries}
          onAction={handleViewVisited}
          actionText="Bekijk Bezocht"
        />
        <StatCard 
          title="Verlanglijst"
          value={wishListCount}
          description="landen om te ontdekken"
          onAction={handleViewWishlist}
          actionText="Bekijk Verlanglijst"
        />
      </section>

      <ActionSection
        title="Klaar voor je volgende avontuur?"
        actionText="Start met Verkennen"
        onAction={handleStartExploring}
      />

      {visitedCount > 0 && (
        <section className="dashboard-recap" aria-labelledby="recap-title">
          <h2 id="recap-title">Jouw Reisherinneringen</h2>
          <p>Je hebt al {visitedCount} prachtige bestemmingen bezocht. Hier zijn je bezochte landen:</p>
          <ul className="visited-countries-grid">
            {selectedCountries.map(country => (
              <li key={country.cca3}>
                <CountryCard
                  country={country}
                  onSelect={() => {}}
                  showScore={false}
                  showRemoveButton={false}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageLayout>
  );
};

Dashboard.propTypes = {
  allCountries: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Dashboard;
