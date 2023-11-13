import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';
import Pagination from '../../common/Pagination';
import Loading from '../../common/Loading';
import '../../../styles/countryList.css';

function CountryList({ onCountrySelect, selectedCountryCodes = [], preferences = {} }) {
  const [allCountries, error] = useCountries();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const {
    language = '',
    region = '',
    currency = '',
    populationMin = 0,
    populationMax = Number.MAX_VALUE,
  } = preferences;

  useEffect(() => {
    if (allCountries && allCountries.length > 0) {
      setIsLoading(false);
      const applyFilters = () => {
        const filtered = allCountries.filter(country => {
          const matchesPreferences = 
            (!language || (country.languages && typeof country.languages === 'object' && Object.values(country.languages).includes(language))) &&
            (!region || country.subregion === region) &&
            (!currency || (country.currencies && typeof country.currencies === 'object' && Object.values(country.currencies).some(cur => cur.name === currency))) &&
            country.population >= populationMin &&
            country.population <= populationMax;
          
          const isSelectedCountry = !selectedCountryCodes.length || selectedCountryCodes.includes(country.cca3);
    
          return matchesPreferences && isSelectedCountry;
        });
        setFilteredCountries(filtered);
      };
      applyFilters();
    } else {
      setIsLoading(true);
    }
  }, [language, region, currency, populationMin, populationMax, allCountries, selectedCountryCodes]);

  // Paginatie logica
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredCountries.slice(indexOfFirstResult, indexOfLastResult);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="country-card-container">
        {currentResults.map(country => (
          <div key={country.cca3} 
               className="country-card" 
               onClick={() => onCountrySelect(country.cca3)} 
               style={{ cursor: 'pointer' }}>
            <img src={country.flags.png} alt={`${country.name.common} vlag`} />
            <div className="country-details">
              <p>{country.name.common}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={Math.ceil(filteredCountries.length / resultsPerPage)} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

export default CountryList;
