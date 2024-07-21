import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../common/Card/Card';
import KeyValuePair from '../../../common/KeyValuePair/KeyValuePair';
import './CountryDetails.css';

const CountryDetails = ({ country }) => {
  const getLanguages = (languages) => languages ? Object.values(languages).join(', ') : 'Unknown';

  const details = [
    { key: 'Official Name', value: country.name.official },
    { key: 'Capital', value: country.capital ? country.capital[0] : 'N/A' },
    { key: 'Region', value: country.region },
    { key: 'Subregion', value: country.subregion || 'N/A' },
    { key: 'Population', value: country.population.toLocaleString() },
    { key: 'Languages', value: getLanguages(country.languages) },
    { key: 'Area', value: `${country.area.toLocaleString()} km²` },
  ];

  return (
    <Card className="country-details">
      <header className="country-details__header">
        <h2 className="country-details__name">{country.name.common}</h2>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="country-details__flag" />
      </header>
      <dl className="country-details__info">
        {details.map((detail) => (
          <KeyValuePair key={detail.key} term={detail.key} description={detail.value} />
        ))}
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