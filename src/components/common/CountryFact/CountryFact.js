import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './CountryFact.css';

const CountryFact = ({ title, icon, value }) => (
  <Card title={title} icon={icon} className="country-fact">
    <p className="fact-value">{value}</p>
  </Card>
);

CountryFact.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CountryFact;