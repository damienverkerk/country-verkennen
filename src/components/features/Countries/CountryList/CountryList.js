import React from 'react';
import PropTypes from 'prop-types';
import CountryCard from '../CountryCard/CountryCard';
import './CountryList.css';

const CountryList = ({ countries, onCountrySelect, className = "country-list" }) => {
  if (!countries || countries.length === 0) {
    return <div className="no-countries">Geen landen gevonden</div>;
  }

  return (
    <div className={className}>
      {countries.map(country => (
        <CountryCard
          key={country.cca3}
          country={country}
          onSelect={onCountrySelect} 
        />
      ))}
    </div>
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