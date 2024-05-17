import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';
import Select from '../../common/Select';
import RangeInput from '../../common/RangeInput';
import '../../../styles/countryFilters.css';

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

  return (
    <div className="filters">
      <div className='filters-select'>
        <Select 
          options={languages} 
          onChange={e => onFilterChange('language', e.target.value)} 
          defaultOption="Select a language" 
        />

        <Select 
          options={regions} 
          onChange={e => onFilterChange('region', e.target.value)} 
          defaultOption="Select a region" 
        />

        <Select 
          options={currencies} 
          onChange={e => onFilterChange('currency', e.target.value)} 
          defaultOption="Select a currency" 
        />
      </div>
      <RangeInput 
        min="0" 
        max={maxPopulation} 
        value={populationRange[1]} 
        onChange={e => handlePopulationChange(parseInt(e.target.value, 10))}
      />
    </div>
  );
};

export default CountryFilters;
