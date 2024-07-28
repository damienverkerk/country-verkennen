import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import useCountries from '../../../../hooks/useCountries';
import { getCapitalCoordinates } from '../../../../services/countryService';
import CountryCard from '../CountryCard/CountryCard';
import Select from '../../../common/Select/Select';
import './CountrySelection.css';

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

  const handleCountrySelect = useCallback(async (event) => {
    const countryCode = event.target.value;
    const selectedCountry = allCountries.find(country => country.cca3 === countryCode);

    if (selectedCountry) {
      const coordinates = await getCapitalCoordinates(selectedCountry.capital, selectedCountry.cca3);
      const updatedCountry = { ...selectedCountry, ...coordinates };
      const updatedCountries = [...localSelectedCountries, updatedCountry];
      setLocalSelectedCountries(updatedCountries);
      onCountrySelect(updatedCountries);
    }
  }, [allCountries, localSelectedCountries, onCountrySelect]);

  const removeCountry = useCallback((countryToRemove) => {
    const newSelectedCountries = localSelectedCountries.filter(country => country.cca3 !== countryToRemove);
    setLocalSelectedCountries(newSelectedCountries);
    onCountrySelect(newSelectedCountries);
  }, [localSelectedCountries, onCountrySelect]);

  const defaultRenderSelectedCountries = useCallback((countries, onRemove) => (
    <ul className="countries-grid">
      {countries.map(country => (
        <li key={country.cca3} className="countries-grid__item">
          <CountryCard
            country={country}
            onSelect={onRemove}
            className="selected-country-card"
            showScore={showScore}
            showRemoveButton={true}
            onRemove={onRemove}
          />
        </li>
      ))}
    </ul>
  ), [showScore]);

  return (
    <section className="country-selection" aria-labelledby="country-selection-title">
      <h2 id="country-selection-title" className="country-selection__title">{title}</h2>
      <Select
        id="country-select"
        name="country-select"
        onChange={handleCountrySelect}
        options={sortedAndFilteredCountries.map(country => ({
          value: country.cca3,
          label: country.name.common
        }))}
        label="Selecteer een land"
        placeholder="Selecteer een land"
      />
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