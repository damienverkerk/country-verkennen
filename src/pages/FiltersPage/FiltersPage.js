import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../contexts/AppStateContext';
import CountryFilters from '../../components/features/Countries/CountryFilters/CountryFilters';
import PageLayout from '../../components/common/PageLayout/PageLayout';
import InfoBox from '../../components/common/InfoBox/InfoBox';
import NavigationButtons from '../../components/common/NavigationButtons/NavigationButtons';
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

  const handleNext = () => navigate('/results');
  const handlePrev = () => navigate('/wishlist-countries');

  return (
    <PageLayout title="Filters">
      <main>
        <InfoBox>
          Pas de filters aan om de zoekresultaten te verfijnen. Dit helpt ons bij het aanbevelen van de beste bestemmingen op basis van jouw voorkeuren.
        </InfoBox>
        <section aria-labelledby="filters-title">
          <h2 id="filters-title" className="visually-hidden">Land Filters</h2>
          <CountryFilters filters={filters} onFilterChange={handleFilterChange} />
        </section>
      </main>
      <NavigationButtons 
        onPrevious={handlePrev}
        onNext={handleNext}
        previousLabel="Terug"
        nextLabel="Volgende"
      />
    </PageLayout>
  );
};

export default FiltersPage;
