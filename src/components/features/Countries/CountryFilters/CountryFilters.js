import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../../common/Select/Select';
import RangeInput from '../../../common/RangeInput/RangeInput';
import useFilterOptions from '../../../../hooks/useFilterOptions';
import './CountryFilters.css';

const FilterSection = ({ label, children }) => (
  <div className="filter-section">
    <h3 className="filter-section__title">{label}</h3>
    {children}
  </div>
);

const CountryFilters = ({ filters, onFilterChange }) => {
  const { languages, regions, subregions, currencies, populationRange, areaRange } = useFilterOptions();

  const handleRangeChange = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  const mapOptions = (options) => options.map(option => ({
    value: option,
    label: option
  }));

  return (
    <form className="filters" aria-label="Land filters">
      <FilterSection label="Selecteer filters">
        <Select
          id="language-select"
          name="language"
          onChange={e => onFilterChange('language', e.target.value)}
          options={mapOptions(languages)}
          label="Taal"
          placeholder="Selecteer een taal"
          autocomplete="language"
        />
        <Select
          id="region-select"
          name="region"
          onChange={e => onFilterChange('region', e.target.value)}
          options={mapOptions(regions)}
          label="Regio"
          placeholder="Selecteer een regio"
          autocomplete="off"
        />
        <Select
          id="subregion-select"
          name="subregion"
          onChange={e => onFilterChange('subregion', e.target.value)}
          options={mapOptions(subregions)}
          label="Subregio"
          placeholder="Selecteer een subregio"
          autocomplete="off"
        />
        <Select
          id="currency-select"
          name="currency"
          onChange={e => onFilterChange('currency', e.target.value)}
          options={mapOptions(currencies)}
          label="Valuta"
          placeholder="Selecteer een valuta"
          autocomplete="off"
        />
      </FilterSection>
      <FilterSection label="Pas bereiken aan">
        <RangeInput 
          id="population-range"
          name="population"
          min={0} 
          max={populationRange[1]} 
          value={filters.population || populationRange[1]} 
          onChange={value => handleRangeChange('population', value)} 
          label="Bevolking" 
          autocomplete="off"
        />
        <RangeInput 
          id="area-range"
          name="area"
          min={0} 
          max={areaRange[1]} 
          value={filters.area || areaRange[1]} 
          onChange={value => handleRangeChange('area', value)} 
          label="Oppervlakte" 
          autocomplete="off"
        />
      </FilterSection>
    </form>
  );
};

CountryFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default CountryFilters;