import React from 'react';
import PropTypes from 'prop-types';
import './CountryCard.css';

const CountryCard = ({ country, onSelect, className = '', showScore = true, showRemoveButton = false, onRemove }) => {
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
      {showRemoveButton && (
        <button onClick={(e) => { e.stopPropagation(); onRemove(country.cca3); }}>Verwijderen</button>
      )}
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
    score: PropTypes.number
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
  showScore: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  onRemove: PropTypes.func
};

export default CountryCard;
