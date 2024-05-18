import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';
import Select from '../../common/Select';
import RangeInput from '../../common/RangeInput';
import '../../../styles/countryFilters.css';

const CountryFilters = ({ onFilterChange }) => {
  const [countries] = useCountries();
  const [languages, setLanguages] = useState([]);
  const [regions, setRegions] = useState([]);
  const [subregions, setSubregions] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [populationRange, setPopulationRange] = useState([0, 1000000000]);
  const [areaRange, setAreaRange] = useState([0, 17098242]);

  useEffect(() => {
    if (countries && countries.length > 0) {
      const uniqueLanguages = [...new Set(countries.flatMap(country => country.languages ? Object.values(country.languages) : []))];
      const uniqueRegions = [...new Set(countries.map(country => country.region).filter(region => region))];
      const uniqueSubregions = [...new Set(countries.map(country => country.subregion).filter(subregion => subregion))];
      const uniqueCurrencies = [...new Set(countries.flatMap(country => country.currencies ? Object.values(country.currencies).map(cur => cur.name) : []))];

      setLanguages(uniqueLanguages);
      setRegions(uniqueRegions);
      setSubregions(uniqueSubregions);
      setCurrencies(uniqueCurrencies);
    }
  }, [countries]);

  const handlePopulationChange = (value) => {
    const newRange = [populationRange[0], value];
    setPopulationRange(newRange);
    onFilterChange('population', value);
  };

  const handleAreaChange = (value) => {
    const newRange = [areaRange[0], value];
    setAreaRange(newRange);
    onFilterChange('area', value);
  };

  return (
    <div className="filters">
      <Select onChange={e => onFilterChange('language', e.target.value)} options={languages} label="Taal" />
      <Select onChange={e => onFilterChange('region', e.target.value)} options={regions} label="Regio" />
      <Select onChange={e => onFilterChange('subregion', e.target.value)} options={subregions} label="Subregio" />
      <Select onChange={e => onFilterChange('currency', e.target.value)} options={currencies} label="Valuta" />
      <RangeInput min="0" max="1000000000" value={populationRange[1]} onChange={handlePopulationChange} label="Bevolking" />
      <RangeInput min="0" max="17098242" value={areaRange[1]} onChange={handleAreaChange} label="Oppervlakte" />
    </div>
  );
};

export default CountryFilters;
