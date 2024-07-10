import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../common/Card/Card';
import Button from '../../../common/Button/Button';
import './BookingSection.css';

const BookingSection = ({ country }) => {
  return (
    <section className="booking-section">
      <h2>Boek een reis naar {country.name.common}</h2>
      <p className="booking-description">
        Ontdek de beste aanbiedingen voor reizen naar {country.name.common}. 
        Bekijk hieronder de prijzen en boek vandaag nog!
      </p>
      <div className="package-list">
        <Card title="Basic Package" icon="fa-plane" className="package-card">
          <p className="price">€500</p>
          <p className="duration">3 dagen, 2 nachten</p>
          <Button onClick={() => console.log('Boek Basic Package')} className="book-button">Boek nu</Button>
        </Card>
        <Card title="Standard Package" icon="fa-hotel" className="package-card">
          <p className="price">€750</p>
          <p className="duration">5 dagen, 4 nachten</p>
          <Button onClick={() => console.log('Boek Standard Package')} className="book-button">Boek nu</Button>
        </Card>
        <Card title="Luxury Package" icon="fa-star" className="package-card">
          <p className="price">€1200</p>
          <p className="duration">7 dagen, 6 nachten</p>
          <Button onClick={() => console.log('Boek Luxury Package')} className="book-button">Boek nu</Button>
        </Card>
      </div>
    </section>
  );
};

BookingSection.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired
};

export default BookingSection;
