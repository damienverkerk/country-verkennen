
import React, { useState, useEffect } from 'react';
import  useCountries  from '../../../hooks/useCountries';
import '../../../styles/countryFilters.css';

function debounce(fn, delay) {
  let timerId;
  return function (...args) {
      if (timerId) {
          clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
          fn(...args);
          timerId = null;
      }, delay);
  }
}

const CountryFilters = ({ onFilterChange }) => {
  const [countries] = useCountries();
  const [languages, setLanguages] = useState([]);
  const [regions, setRegions] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [populationRange, setPopulationRange] = useState([0, 1000000000]); 
  const [maxPopulation, setMaxPopulation] = useState(0);

  useEffect(() => {
    if (countries && countries.length > 0) {
      const uniqueLanguages = [...new Set(countries.flatMap(country => country.languages ? Object.values(country.languages) : []))];
      const uniqueRegions = [...new Set(countries.map(country => country.subregion).filter(subregion => subregion))];
      const uniqueCurrencies = [...new Set(countries.flatMap(country => country.currencies ? Object.values(country.currencies).map(cur => cur.name) : []))];

      setLanguages(uniqueLanguages);
      setRegions(uniqueRegions);
      setCurrencies(uniqueCurrencies);

      const maxPop = Math.max(...countries.map(country => country.population));
      setMaxPopulation(maxPop);
      setPopulationRange([0, maxPop]);
    }
  }, [countries]);

  const handlePopulationChange = (value) => {
    const newRange = [populationRange[0], value];
    setPopulationRange(newRange);
    onFilterChange('populationMax', value);
  };

  const debouncedFilterChange = debounce(onFilterChange, 200);

  return (
    <div className="filters">
    <div className='filters-select'>
    <select onChange={e => onFilterChange('language', e.target.value)}>
      <option value="">Select a language</option>
      {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
    </select>

    <select onChange={e => onFilterChange('region', e.target.value)}>
      <option value="">Select a region</option>
      {regions.map(region => <option key={region} value={region}>{region}</option>)}
    </select>

    <select onChange={e => onFilterChange('currency', e.target.value)}>
      <option value="">Select a currency</option>
      {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
    </select>
    </div>
    <div className='filters-range'>
      <input 
          type="range" 
          min="0" 
          max={maxPopulation} 
          value={populationRange[1]} 
          onChange={e => {
            const value = parseInt(e.target.value);
            setPopulationRange([populationRange[0], value]);
            debouncedFilterChange('populationMax', value);
        }}/>
      <span>{populationRange[1]}</span>
  </div>
  </div>



  );
};

export default CountryFilters;





