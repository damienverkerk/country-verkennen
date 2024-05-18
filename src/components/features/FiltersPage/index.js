import React from 'react';
import CountryFilters from '../CountryFilters';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../../contexts/AppStateContext';
import '../../../styles/filtersPage.css';

const FiltersPage = () => {
  const { filters, setFilters } = useAppState();
  const navigate = useNavigate();

  const handleFilterChange = (filterKey, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterKey]: value
    }));
  };

  const handleNext = () => {
    navigate('/results');
  };

  const handlePrev = () => {
    navigate('/wishlist-countries');
  };

  return (
    <div className="filters-container">
      <h2>Filters</h2>
      <CountryFilters filters={filters} onFilterChange={handleFilterChange} />
      <button onClick={handlePrev}>Terug</button>
      <button onClick={handleNext}>Volgende</button>
    </div>
  );
};

export default FiltersPage;
