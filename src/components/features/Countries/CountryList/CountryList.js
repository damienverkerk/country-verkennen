import React from 'react';
import PropTypes from 'prop-types';
import CountryCard from '../CountryCard/CountryCard';
import EmptyState from '../../../common/EmptyState/EmptyState';
import './CountryList.css';

const CountryList = ({ countries, onCountrySelect, className = "country-list" }) => {
  if (!countries || countries.length === 0) {
    return <EmptyState message="Geen landen gevonden" />;
  }

  return (
    <ul className={className} >
      {countries.map(country => (
        <li key={country.cca3} className="country-list__item">
          <CountryCard
            country={country}
            onSelect={onCountrySelect} 
          />
        </li>
      ))}
    </ul>
  );
};

CountryList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    cca3: PropTypes.string.isRequired,
    name: PropTypes.shape({
      common: PropTypes.string.isRequired
    }).isRequired,
    flags: PropTypes.shape({
      png: PropTypes.string.isRequired
    }).isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    subregion: PropTypes.string,
    score: PropTypes.number.isRequired
  })).isRequired,
  onCountrySelect: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default CountryList;