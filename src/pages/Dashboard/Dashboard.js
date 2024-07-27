import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import CountryCard from '../../components/features/Countries/CountryCard/CountryCard';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import StatCard from '../../components/common/StatCard/StatCard';
import ActionSection from '../../components/common/ActionSection/ActionSection';
import './Dashboard.css';

const Dashboard = () => {
  const { 
    selectedCountries, 
    wishListCountries, 
    bookedTrips,
    removeSelectedCountry,
    removeWishListCountry,
    removeBookedTrip
  } = useAppState();
  const navigate = useNavigate();

  const visitedCount = useMemo(() => selectedCountries.length, [selectedCountries]);
  const wishListCount = useMemo(() => wishListCountries.length, [wishListCountries]);
  const bookedTripsCount = useMemo(() => bookedTrips.length, [bookedTrips]);

  const handleStartExploring = () => navigate('/visited-countries');
  const handleViewWishlist = () => navigate('/wishlist-countries');
  const handleViewVisited = () => navigate('/visited-countries');
  const handleViewBookedTrips = () => navigate('/booked-trips');

  return (
      <PageLayout title="Welkom bij jouw Reisavontuur">
        <main className="dashboard-content">
          <section className="dashboard-stats" aria-labelledby="stats-title">
            <h2 id="stats-title" className="visually-hidden">Reis Statistieken</h2>
            <StatCard 
              title="Bezochte Landen"
              value={visitedCount}
              description="landen die je bezocht hebt"
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
            <StatCard 
            title="Geboekte Reizen"
            value={bookedTripsCount}
            description="aankomende avonturen"
            onAction={handleViewBookedTrips}
            actionText="Bekijk Boekingen"
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
              <ul className="countries-grid">
                {selectedCountries.map(country => (
                  <li key={country.cca3}>
                    <CountryCard
                      country={country}
                      onSelect={() => navigate(`/country/${country.cca3}`)}
                      showRemoveButton={true}
                      onRemove={() => removeSelectedCountry(country.cca3)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {wishListCount > 0 && (
          <section className="dashboard-wishlist" aria-labelledby="wishlist-title">
            <h2 id="wishlist-title">Jouw Verlanglijst</h2>
            <p>Je hebt {wishListCount} landen op je verlanglijst. Hier zijn ze:</p>
            <ul className="countries-grid">
              {wishListCountries.map(country => (
                <li key={country.cca3}>
                  <CountryCard
                    country={country}
                    onSelect={() => navigate(`/country/${country.cca3}`)}
                    showRemoveButton={true}
                    onRemove={() => removeWishListCountry(country.cca3)}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {bookedTripsCount > 0 && (
          <section className="dashboard-booked-trips" aria-labelledby="booked-trips-title">
            <h2 id="booked-trips-title">Jouw Geboekte Reizen</h2>
            <ul className="booked-trips-grid">
              {bookedTrips.map((trip, index) => (
                <li key={index}>
                  <Card title={trip.hotel.name} className="booked-trip-card">
                    <p>Geboekt op: {new Date(trip.bookingDate).toLocaleDateString()}</p>
                    <p>Check-in: {trip.checkInDate}</p>
                    <p>Check-out: {trip.checkOutDate}</p>
                    <p>Prijs: {trip.price} {trip.currency}</p>
                    <Button onClick={() => removeBookedTrip(trip.id)}>Annuleer Boeking</Button>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </PageLayout>
  );
};

export default Dashboard;