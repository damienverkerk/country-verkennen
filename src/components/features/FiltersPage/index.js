import React from 'react';
import CountryFilters from '../CountryFilters';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../../contexts/AppStateContext';
import Button from '../../common/Button';
import Card from '../../common/Card';
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
      <Card title="Filters">
        <section className="info-section">
          <p>Pas de filters aan om de zoekresultaten te verfijnen. Dit helpt ons bij het aanbevelen van de beste bestemmingen op basis van jouw voorkeuren.</p>
        </section>
        <section>
          <CountryFilters filters={filters} onFilterChange={handleFilterChange} />
        </section>
        <section className="buttons-section">
          <Button onClick={handlePrev}>Terug</Button>
          <Button onClick={handleNext}>Volgende</Button>
        </section>
      </Card>
    </div>
  );
};

export default FiltersPage;
