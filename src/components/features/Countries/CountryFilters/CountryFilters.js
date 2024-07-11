import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../../common/Select/Select';
import RangeInput from '../../../common/RangeInput/RangeInput';
import useFilterOptions from '../../../../hooks/useFilterOptions';
import './CountryFilters.css';

const FilterSection = ({ label, children }) => (
  <div className="filter-section">
    <h3>{label}</h3>
    {children}
  </div>
);

const CountryFilters = ({ onFilterChange }) => {
  const { languages, regions, subregions, currencies, populationRange, areaRange } = useFilterOptions();

  const handleRangeChange = (filterName, value) => {
    const newRange = [0, value];
    onFilterChange(filterName, newRange);
  };

  const mapOptions = (options) => options.map(option => ({
    value: option,
    label: option
  }));

  return (
    <form className="filters" aria-label="Land filters">
      <FilterSection label="Selecteer filters">
        <Select
          onChange={e => onFilterChange('language', e.target.value)}
          options={mapOptions(languages)}
          label="Taal"
          placeholder="Selecteer een taal"
        />
        <Select
          onChange={e => onFilterChange('region', e.target.value)}
          options={mapOptions(regions)}
          label="Regio"
          placeholder="Selecteer een regio"
        />
        <Select
          onChange={e => onFilterChange('subregion', e.target.value)}
          options={mapOptions(subregions)}
          label="Subregio"
          placeholder="Selecteer een subregio"
        />
        <Select
          onChange={e => onFilterChange('currency', e.target.value)}
          options={mapOptions(currencies)}
          label="Valuta"
          placeholder="Selecteer een valuta"
        />
      </FilterSection>
      <FilterSection label="Pas bereiken aan">
        <RangeInput 
          min={0} 
          max={populationRange[1]} 
          value={populationRange[1]} 
          onChange={value => handleRangeChange('population', value)} 
          label="Bevolking" 
        />
        <RangeInput 
          min={0} 
          max={areaRange[1]} 
          value={areaRange[1]} 
          onChange={value => handleRangeChange('area', value)} 
          label="Oppervlakte" 
        />
      </FilterSection>
    </form>
  );
};

CountryFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default CountryFilters;
