import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';

function CountryList({ onCountrySelect, selectedCountries, preferences = {} }) {
  const [allCountries, error] = useCountries();
  const [filteredCountries, setFilteredCountries] = useState([]);

  const {
    language = '',
    region = '',
    currency = '',
    populationMin = 0,
    populationMax = Number.MAX_VALUE,
  } = preferences;

  useEffect(() => {
    if (allCountries?.length > 0) {
      setFilteredCountries(allCountries);
    }
  }, [allCountries]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = allCountries?.filter(country => {
        return (
          (!language || (country.languages && typeof country.languages === 'object' && Object.values(country.languages).includes(language))) &&
          (!region || country.subregion === region) &&
          (!currency || (country.currencies && typeof country.currencies === 'object' && Object.values(country.currencies).some(cur => cur.name === currency))) &&
          country.population >= populationMin &&
          country.population <= populationMax
        );
      });
      setFilteredCountries(filtered);
    };

    if (allCountries?.length > 0) {
      applyFilters();
    }
  }, [language, region, currency, populationMin, populationMax, allCountries]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {filteredCountries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => onCountrySelect(country.cca3)}>
            {Array.isArray(selectedCountries) && selectedCountries.includes(country.cca3) ? 'Deselect' : 'Select'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default CountryList;
