import React from 'react';
import CountryFilters from '../../components/features/Countries/CountryFilters/CountryFilters';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import './FiltersPage.css';

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
    <PageLayout title="Filters">
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
    </PageLayout>
  );
};

export default FiltersPage;
