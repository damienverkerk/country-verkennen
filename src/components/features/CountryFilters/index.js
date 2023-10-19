import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../../services/countryService';
import '../../../styles/countryFilters.css';

const CountryFilters = ({ onFilterChange }) => {
  const [languages, setLanguages] = useState([]);
  const [regions, setRegions] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [populationRange, setPopulationRange] = useState([0, 1000000000]); 

  useEffect(() => {
    const initData = async () => {
      const countries = await fetchCountries();

      const uniqueLanguages = [
        ...new Set(
          countries
            .flatMap(country => 
              country.languages ? Object.values(country.languages) : []
            )
        )
      ];
      const uniqueRegions = [
        ...new Set(
          countries
            .map(country => country.subregion)
            .filter(subregion => subregion)
        )
      ];
      
      const uniqueCurrencies = [
        ...new Set(
          countries
            .flatMap(country => 
              country.currencies ? Object.values(country.currencies).map(cur => cur.name) : []
            )
        )
      ];
      
    console.log(uniqueLanguages);
      setLanguages(uniqueLanguages);
      setRegions(uniqueRegions);
      setCurrencies(uniqueCurrencies);
      
    };
    
    initData();
  }, []);

  return (
    <div className="filters">
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

      <input 
        type="range" 
        min="0" 
        max="1000000000" 
        value={populationRange[0]} 
        onChange={e => onFilterChange('populationMin', parseInt(e.target.value))}
      />
      <input 
        type="range" 
        min="0" 
        max="1000000000" 
        value={populationRange[1]} 
        onChange={e => onFilterChange('populationMax', parseInt(e.target.value))}
      />
    </div>
  );
};
export default CountryFilters;
