import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../common/Card/Card';
import './CountryDetails.css';

const CountryDetails = ({ country }) => {
  const getLanguages = (languages) => languages ? Object.values(languages).join(', ') : 'Unknown';

  return (
    <Card className="country-details">
      <header>
        <h2>{country.name.common}</h2>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="country-flag" />
      </header>
      <dl>
        <dt>Official Name:</dt>
        <dd>{country.name.official}</dd>
        
        <dt>Capital:</dt>
        <dd>{country.capital ? country.capital[0] : 'N/A'}</dd>
        
        <dt>Region:</dt>
        <dd>{country.region}</dd>
        
        <dt>Subregion:</dt>
        <dd>{country.subregion || 'N/A'}</dd>
        
        <dt>Population:</dt>
        <dd>{country.population.toLocaleString()}</dd>
        
        <dt>Languages:</dt>
        <dd>{getLanguages(country.languages)}</dd>
        
        <dt>Area:</dt>
        <dd>{country.area.toLocaleString()} km²</dd>
      </dl>
    </Card>
  );
};

CountryDetails.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
      official: PropTypes.string.isRequired,
    }).isRequired,
    flags: PropTypes.shape({
      png: PropTypes.string.isRequired,
    }).isRequired,
    capital: PropTypes.arrayOf(PropTypes.string),
    region: PropTypes.string.isRequired,
    subregion: PropTypes.string,
    population: PropTypes.number.isRequired,
    languages: PropTypes.object,
    area: PropTypes.number.isRequired,
  }).isRequired,
};

export default CountryDetails;
