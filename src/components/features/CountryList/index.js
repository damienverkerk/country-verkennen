import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';

function CountryList({ onCountrySelect, selectedCountries, preferences }) {
    const [allCountries, error] = useCountries();
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        if (allCountries && allCountries.length) {
            setFilteredCountries(allCountries);
        }
    }, [allCountries]);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = allCountries.filter(country => {
                return (
                    (!preferences.language || (country.languages && typeof country.languages === 'object' && Object.values(country.languages).includes(preferences.language))) &&
                    (!preferences.region || country.subregion === preferences.region) &&
                    (!preferences.currency || (country.currencies && typeof country.currencies === 'object' && Object.values(country.currencies).some(cur => cur.name === preferences.currency))) &&
                    country.population >= preferences.populationMin &&
                    country.population <= preferences.populationMax
                );
            });
            setFilteredCountries(filtered);
        };

        applyFilters();
    }, [preferences, allCountries]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
      <div>
          {filteredCountries.map(country => (
              <div key={country.cca3}>
                  {country.name.common}
                  <button onClick={() => onCountrySelect(country.cca3)}>
                      {selectedCountries.includes(country.cca3) ? 'Deselect' : 'Select'}
                  </button>
              </div>
          ))}
      </div>
    );
}

export default CountryList;


