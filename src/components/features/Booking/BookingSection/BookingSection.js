import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import PackageCard from '../../../common/PackageCard/PackageCard';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';
import Loading from '../../../common/Loading/Loading';
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
      setError('Geen beschikbare boekingsopties gevonden.');
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
        chainCode: hotel.chainCode || '',
        iataCode: hotel.iataCode || '',
      },
      bookingDate: new Date().toISOString(),
      checkInDate: hotel.cheapestOffer?.checkInDate || 'N/A',
      checkOutDate: hotel.cheapestOffer?.checkOutDate || 'N/A',
      price: parseFloat(hotel.cheapestOffer?.price?.total || 0),
      currency: hotel.cheapestOffer?.price?.currency || 'N/A',
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
        {isLoading && <Loading size="medium" message="Boekingsopties laden..." />}
        {error && <p className="error-message">{error}</p>}
        {bookingOptions.map((option) => {
          const price = option.cheapestOffer?.price?.total || 'N/A';
          const distance = option.distance ? `${option.distance.value} ${option.distance.unit}` : 'Geen afstandsgegevens';
          
          return (
            <PackageCard
              key={option.hotelId}
              title={option.name}
              icon="fa-hotel"
              price={price}
              duration={distance}
              onBook={() => handleInfoClick(option)}
            />
          );
        })}
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
