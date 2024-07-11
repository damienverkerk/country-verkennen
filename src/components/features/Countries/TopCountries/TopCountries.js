import React from 'react';
import PropTypes from 'prop-types';
import CountryCard from '../CountryCard/CountryCard';
import EmptyState from '../../../common/EmptyState/EmptyState';
import './TopCountries.css';

const TopCountries = ({ countries = [], onCountrySelect }) => {
  if (countries.length === 0) {
    return <EmptyState message="Er zijn nog geen landen geselecteerd. Maak eerst een selectie." />;
  }

  const topCountries = countries.slice(0, 3);

  return (
    <section className="top-countries-container" aria-labelledby="top-countries-title">
      <h2 id="top-countries-title" className="visually-hidden">Top 3 Landen</h2>
      <ul className="top-countries-list" role="list">
        {topCountries.map((country, index) => (
          <li key={country.cca3} className={`top-country-${index + 1}`}>
            <CountryCard 
              country={country} 
              onSelect={onCountrySelect} 
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

TopCountries.propTypes = {
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
  onCountrySelect: PropTypes.func.isRequired
};

export default TopCountries;
