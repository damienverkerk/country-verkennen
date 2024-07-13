import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import PackageCard from '../../../common/PackageCard/PackageCard';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';
import { useAppState } from '../../../../contexts/AppStateContext';
import { fetchBookingOptions } from '../../../../services/bookingService';
import './BookingSection.css';

const BookingSection = ({ country }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingOptions, setBookingOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addBookedTrip } = useAppState();
  const navigate = useNavigate();

  const fetchHotels = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [lat, lng] = country.capitalInfo.latlng;
      const optionsWithPrices = await fetchBookingOptions(lat, lng);
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

  const handleInfoClick = useCallback((hotel) => {
    setSelectedHotel(hotel);
    setShowBookingModal(true);
  }, []);

  const handleCloseBookingModal = useCallback(() => {
    setShowBookingModal(false);
    setSelectedHotel(null);
  }, []);

  const handleBookNow = useCallback((hotel) => {
    const newTrip = {
      hotel: {
        name: hotel.name,
        chainCode: hotel.chainCode,
        iataCode: hotel.iataCode,
      },
      bookingDate: new Date().toISOString(),
      checkInDate: hotel.cheapestOffer.checkInDate,
      checkOutDate: hotel.cheapestOffer.checkOutDate,
      price: parseFloat(hotel.cheapestOffer.price.total),
      currency: hotel.cheapestOffer.price.currency,
    };
    addBookedTrip(newTrip);
    setShowBookingModal(false);
    setShowSuccessModal(true);
  }, [addBookedTrip]);

  const handleCloseSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
    navigate('/');
  }, [navigate]);

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
      
      <Modal
        isOpen={showBookingModal}
        onClose={handleCloseBookingModal}
        title="Hotel Informatie"
        modalType="booking"
        hotel={selectedHotel}
        onBookNow={handleBookNow}
      />

      <Modal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title="Boeking Succesvol"
        content={
          <div>
            <p>Uw hotel is succesvol geboekt. Bedankt voor uw reservering!</p>
            <Button onClick={handleCloseSuccessModal}>Terug naar Dashboard</Button>
          </div>
        }
      />
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