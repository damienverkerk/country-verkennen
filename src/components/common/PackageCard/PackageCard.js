import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Button from '../Button/Button';

const PackageCard = ({ title, icon, price, duration, onBook }) => (
  <Card title={title} icon={icon} className="package-card">
    <p className="price">€{price}</p>
    <p className="duration">{duration}</p>
    <Button onClick={onBook} className="book-button">Boek nu</Button>
  </Card>
);

PackageCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  onBook: PropTypes.func.isRequired
};

export default PackageCard;
