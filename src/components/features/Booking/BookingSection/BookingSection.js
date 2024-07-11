import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import PackageCard from '../../../common/PackageCard/PackageCard';
import { fetchBookingOptions } from '../../../../services/bookingService';
import BookingModal from '../BookingModal/BookingModal';
import './BookingSection.css';

const BookingSection = ({ country }) => {
  const [showModal, setShowModal] = useState(false);
  const [bookingOptions, setBookingOptions] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotels = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [lat, lng] = country.capitalInfo.latlng;
      console.log('Fetching booking options for:', lat, lng);
      const optionsWithPrices = await fetchBookingOptions(lat, lng);
      console.log('Options with prices:', optionsWithPrices);

      setBookingOptions(optionsWithPrices);
      if (optionsWithPrices.length === 0) {
        setError('Geen beschikbare boekingsopties gevonden.');
      }
    } catch (error) {
      console.error('Failed to fetch booking options:', error);
      setError('Er is een fout opgetreden bij het ophalen van boekingsopties. Probeer het later opnieuw.');
    } finally {
      setIsLoading(false);
    }
  }, [country]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const handleInfoClick = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  return (
    <section className="booking-section" aria-labelledby="booking-title">
      <h2 id="booking-title">Boek een reis naar {country.name.common}</h2>
      <p className="booking-description">
        Ontdek de beste aanbiedingen voor reizen naar {country.name.common}. 
        Bekijk hieronder de prijzen en boek vandaag nog!
      </p>
      <div className="package-list">
        {isLoading && <p>Laden...</p>}
        {error && <p className="error-message">{error}</p>}
        {bookingOptions.map((option) => (
          <PackageCard
            key={option.hotelId}
            title={option.name}
            icon="fa-hotel"
            price={option.cheapestOffer.price.total}
            duration={`${option.distance.value} ${option.distance.unit}`}
            onBook={() => handleInfoClick(option)}
          />
        ))}
      </div>
      {showModal && <BookingModal hotel={selectedHotel} onClose={() => setShowModal(false)} />}
    </section>
  );
};

BookingSection.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired,
    capitalInfo: PropTypes.shape({
      latlng: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired
  }).isRequired
};

export default BookingSection;
