import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../common/Card/Card';
import Button from '../../../common/Button/Button';
import './CountryCard.css';

const CountryCard = ({ country, onSelect, className = '', showScore = true, showRemoveButton = false, onRemove }) => {
  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(country.cca3);
    }
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(country.cca3);
    }
  };

  return (
    <Card 
      className={`country-card ${className}`} 
      onClick={handleClick}
      role="button"
      tabIndex="0"
      title={country.name.common}
    >
      <div className="country-flag-container">
        <img className="country-flag" src={country.flags.png} alt={`Vlag van ${country.name.common}`} />
      </div>
      <div className="country-details">
        <ul>
          <li>Bevolking: {country.population.toLocaleString()}</li>
          <li>Regio: {country.region}</li>
          {country.subregion && <li>Subregio: {country.subregion}</li>}
          {showScore && country.score && <li className="country-score">Score: {country.score.toFixed(2)}%</li>}
        </ul>
      </div>
      {showRemoveButton && (
        <div className="remove-button-container">
          <Button 
            onClick={handleRemove}
            className="remove-button"
            aria-label={`Verwijder ${country.name.common}`}
          >
            Verwijderen
          </Button>
        </div>
      )}
    </Card>
  );
};

CountryCard.propTypes = {
  country: PropTypes.shape({
    cca3: PropTypes.string.isRequired,
    flags: PropTypes.shape({
      png: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    subregion: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
  showScore: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  onRemove: PropTypes.func,
};

export default CountryCard;
