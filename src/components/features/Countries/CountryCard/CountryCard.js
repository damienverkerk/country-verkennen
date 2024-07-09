import React from 'react';
import './CountryCard.css';
import PropTypes from 'prop-types';

  const CountryCard = ({ country, onSelect, className = '', showScore = true }) => {
    return (
      <div className={`country-card ${className}`} onClick={() => onSelect(country.cca3)}>
        <img className="country-flag" src={country.flags.png} alt={`Vlag van ${country.name.common}`} />
        <div className="country-details">
          <h3>{country.name.common}</h3>
          <p>Bevolking: {country.population.toLocaleString()}</p>
          <p>Regio: {country.region}</p>
          {country.subregion && <p>Subregio: {country.subregion}</p>}
          {showScore && <p className="country-score">Score: {country.score.toFixed(2)}%</p>}
        </div>
      </div>
    );
  };
CountryCard.propTypes = {
  country: PropTypes.shape({
    cca3: PropTypes.string.isRequired,
    flags: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    subregion: PropTypes.string,
    score: PropTypes.number.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default CountryCard;