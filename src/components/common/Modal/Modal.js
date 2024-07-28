import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useAppState } from '../../../contexts/AppStateContext';
import './Modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  content = null, 
  modalType = 'default', 
  hotel = null 
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { addBookedTrip } = useAppState();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleBookNow = useCallback(() => {
    if (modalType === 'booking' && hotel) {
      const newTrip = {
        hotel: {
          name: hotel.name,
        },
        bookingDate: new Date().toISOString(),
        checkInDate: hotel.cheapestOffer?.checkInDate || 'N/A',
        checkOutDate: hotel.cheapestOffer?.checkOutDate || 'N/A',
        price: parseFloat(hotel.cheapestOffer?.price?.total || 0),
        currency: hotel.cheapestOffer?.price?.currency || 'N/A',
      };
      addBookedTrip(newTrip);
      setShowSuccessModal(true);
    }
  }, [modalType, hotel, addBookedTrip]);

  const handleSuccessClose = useCallback(() => {
    setShowSuccessModal(false);
    onClose();
    navigate('/');
  }, [onClose, navigate]);

  if (!isOpen) return null;

  let modalContent;
  if (showSuccessModal) {
    modalContent = (
      <section aria-label="Booking confirmation">
        <p>Uw hotel is succesvol geboekt. Bedankt voor uw reservering!</p>
        <Button onClick={handleSuccessClose}>Terug naar Dashboard</Button>
      </section>
    );
  } else if (modalType === 'booking' && hotel) {
    modalContent = (
      <article className="hotel-info">
        <h3>{hotel.name}</h3>
        <dl>
          <dt>Hotelketen:</dt>
          <dd>{hotel.chainCode || 'N/A'}</dd>
          <dt>IATA-code:</dt>
          <dd>{hotel.iataCode || 'N/A'}</dd>
          <dt>Afstand:</dt>
          <dd>{hotel.distance ? `${hotel.distance.value} ${hotel.distance.unit}` : 'Geen afstandsgegevens'}</dd>
          <dt>Prijs:</dt>
          <dd>{hotel.cheapestOffer?.price?.total || 'N/A'} {hotel.cheapestOffer?.price?.currency || 'N/A'}</dd>
        </dl>
        <Button onClick={handleBookNow}>Boek nu</Button>
      </article>
    );
  } else {
    modalContent = content;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal" 
        onClick={e => e.stopPropagation()} 
        role="dialog" 
        aria-labelledby="modal-title"
        ref={modalRef}
        tabIndex="-1"
      >
        <header className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <div className="modal-content">
          {modalContent}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
  modalType: PropTypes.oneOf(['default', 'booking']),
  hotel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    chainCode: PropTypes.string,
    iataCode: PropTypes.string,
    distance: PropTypes.shape({
      value: PropTypes.number,
      unit: PropTypes.string
    }),
    cheapestOffer: PropTypes.shape({
      price: PropTypes.shape({
        total: PropTypes.string,
        currency: PropTypes.string
      }),
      checkInDate: PropTypes.string,
      checkOutDate: PropTypes.string
    })
  })
};

export default Modal;