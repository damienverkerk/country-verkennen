import React, { useState, useEffect, useMemo } from 'react';
import useCountries from '../../../../hooks/useCountries';
import { getCapitalCoordinates } from '../../../../services/countryService';
import CountryCard from '../CountryCard/CountryCard';
import './CountrySelection.css';
import PropTypes from 'prop-types';

const CountrySelection = ({ 
  onCountrySelect, 
  selectedCountries, 
  title, 
  renderSelectedCountries,
  showScore = false
}) => {
  const [allCountries] = useCountries(); 
  const [localSelectedCountries, setLocalSelectedCountries] = useState(selectedCountries);

  useEffect(() => {
    setLocalSelectedCountries(selectedCountries);
  }, [selectedCountries]);

  const sortedAndFilteredCountries = useMemo(() => {
    return allCountries
      .filter(country => !localSelectedCountries.some(selected => selected.cca3 === country.cca3))
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  }, [allCountries, localSelectedCountries]);

  const handleCountrySelect = async (event) => {
    const countryCode = event.target.value;
    const selectedCountry = allCountries.find(country => country.cca3 === countryCode);

    if (selectedCountry) {
      const coordinates = await getCapitalCoordinates(selectedCountry.capital, selectedCountry.cca3);
      const updatedCountry = { ...selectedCountry, ...coordinates };
      const updatedCountries = [...localSelectedCountries, updatedCountry];
      setLocalSelectedCountries(updatedCountries);
      onCountrySelect(updatedCountries);
    }
  };

  const removeCountry = (countryToRemove) => {
    const newSelectedCountries = localSelectedCountries.filter(country => country.cca3 !== countryToRemove);
    setLocalSelectedCountries(newSelectedCountries);
    onCountrySelect(newSelectedCountries);
  };

  const defaultRenderSelectedCountries = (countries, onRemove) => (
    <div className="countries-grid">
      {countries.map(country => (
        <CountryCard
          key={country.cca3}
          country={country}
          onSelect={onRemove}
          className="selected-country-card"
          showScore={showScore}
          showRemoveButton={true}
          onRemove={onRemove}
        />
      ))}
    </div>
  );

  return (
    <section className="country-selection">
      <h3>{title}</h3>
      <select onChange={handleCountrySelect} value="">
        <option value="">Selecteer een land</option>
        {sortedAndFilteredCountries.map(country => (
          <option key={country.cca3} value={country.cca3}>
            {country.name.common}
          </option>
        ))}
      </select>
      <div className="selected-countries-container">
        {renderSelectedCountries 
          ? renderSelectedCountries(localSelectedCountries, removeCountry)
          : defaultRenderSelectedCountries(localSelectedCountries, removeCountry)
        }
      </div>
    </section>
  );
};

CountrySelection.propTypes = {
  onCountrySelect: PropTypes.func.isRequired,
  selectedCountries: PropTypes.arrayOf(PropTypes.shape({
    cca3: PropTypes.string.isRequired,
    name: PropTypes.shape({
      common: PropTypes.string.isRequired
    }).isRequired,
    capital: PropTypes.arrayOf(PropTypes.string),
    flags: PropTypes.shape({
      png: PropTypes.string.isRequired
    }).isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    subregion: PropTypes.string
  })).isRequired,
  title: PropTypes.string.isRequired,
  renderSelectedCountries: PropTypes.func,
  showScore: PropTypes.bool
};

export default CountrySelection;
