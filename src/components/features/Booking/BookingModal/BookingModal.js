import React from 'react';
import PropTypes from 'prop-types';
import './BookingModal.css';

const BookingModal = ({ hotel, onClose }) => {
  if (!hotel) {
    return null;
  }

  const {
    name,
    chainCode,
    iataCode,
    hotelId,
    distance,
    cheapestOffer,
    geoCode,
    address,
    lastUpdate
  } = hotel;

  return (
    <div className="booking-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Hotelinformatie</h2>
        <p>Hotelnaam: {name}</p>
        <p>Hotelketen: {chainCode}</p>
        <p>IATA-code: {iataCode}</p>
        <p>Hotel ID: {hotelId}</p>
        <p>Afstand: {distance?.value} {distance?.unit}</p>
        <p>Prijs: {cheapestOffer?.price?.base} {cheapestOffer?.price?.currency}</p>
        <p>Locatie: Latitude: {geoCode.latitude}, Longitude: {geoCode.longitude}</p>
        <p>Landcode: {address.countryCode}</p>
        <p>Laatste update: {new Date(lastUpdate).toLocaleString()}</p>
        
        {cheapestOffer && (
          <div>
            <h3>Goedkoopste aanbieding</h3>
            <p>Check-in datum: {cheapestOffer.checkInDate}</p>
            <p>Check-out datum: {cheapestOffer.checkOutDate}</p>
            <p>Kamertype: {cheapestOffer.room.typeEstimated.category}</p>
            <p>Kamerbeschrijving: {cheapestOffer.room.description.text}</p>
            <p>Aantal volwassenen: {cheapestOffer.guests.adults}</p>
            <p>Betalingstype: {cheapestOffer.policies.paymentType}</p>
          </div>
        )}
        
        <button className="book-button">Boek nu</button>
      </div>
    </div>
  );
};

BookingModal.propTypes = {
  hotel: PropTypes.shape({
    name: PropTypes.string,
    chainCode: PropTypes.string,
    iataCode: PropTypes.string,
    hotelId: PropTypes.string,
    distance: PropTypes.shape({
      value: PropTypes.number,
      unit: PropTypes.string
    }),
    cheapestOffer: PropTypes.shape({
      checkInDate: PropTypes.string,
      checkOutDate: PropTypes.string,
      price: PropTypes.shape({
        base: PropTypes.string,
        currency: PropTypes.string
      }),
      room: PropTypes.shape({
        typeEstimated: PropTypes.shape({
          category: PropTypes.string
        }),
        description: PropTypes.shape({
          text: PropTypes.string
        })
      }),
      guests: PropTypes.shape({
        adults: PropTypes.number
      }),
      policies: PropTypes.shape({
        paymentType: PropTypes.string
      })
    }),
    geoCode: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number
    }),
    address: PropTypes.shape({
      countryCode: PropTypes.string
    }),
    lastUpdate: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default BookingModal;