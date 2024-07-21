import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Button from '../Button/Button';
import './PackageCard.css';

const PackageCard = ({ title, icon, price, duration, onBook }) => (
  <Card title={title} icon={icon} className="package-card">
    <div className="package-card__content">
      <p className="package-card__price">€{price}</p>
      <p className="package-card__duration">{duration}</p>
      <Button onClick={onBook} className="btn package-card__book-button">Boek nu</Button>
    </div>
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