import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import InfoBox from '../../components/common/InfoBox/InfoBox';
import './BookedTripsPage.css';

const BookedTripsPage = () => {
  const { bookedTrips, removeBookedTrip } = useAppState();

  return (
    <PageLayout title="Geboekte Reizen">
      <main className="booked-trips-container">
      <InfoBox>
      Hier vind je een overzicht van al je geboekte reizen. Je kunt de details van elke boeking bekijken en, indien nodig, een boeking annuleren. Geniet van het plannen van je avonturen!
        </InfoBox>
        {bookedTrips.length === 0 ? (
          <p>Je hebt nog geen reizen geboekt.</p>
        ) : (
          <ul className="booked-trips-list">
            {bookedTrips.map((trip) => (
              <li key={trip.id}>
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
        )}
      </main>
    </PageLayout>
  );
};

export default BookedTripsPage;