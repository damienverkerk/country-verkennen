import React from 'react';
import PropTypes from 'prop-types';
import CountryCard from '../CountryCard/CountryCard';
import './TopCountries.css';

const TopCountries = ({ countries = [], onCountrySelect }) => {
  if (countries.length === 0) {
    return <p>Er zijn nog geen landen geselecteerd. Maak eerst een selectie.</p>;
  }

  const topCountries = countries.slice(0, 3);

  return (
    <div className="top-countries-container">
      <div className="top-countries-list">
        {topCountries.map((country, index) => {
          const positionClass = `top-country-${index + 1}`;
          return (
            <CountryCard 
              key={country.cca3} 
              country={country} 
              onSelect={onCountrySelect} 
              className={positionClass} 
            />
          );
        })}
      </div>
    </div>
  );
};

TopCountries.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCountrySelect: PropTypes.func.isRequired
};

export default TopCountries;
