import React, { useState, useEffect } from 'react';
import useCountries from '../../../hooks/useCountries';
import Pagination from '../../common/Pagination';
import Loading from '../../common/Loading';
import '../../../styles/countryList.css';

function calculateMatchScore(country, filters) {
  let score = 0;
  let totalCriteria = 0;

  if (filters.language) {
    totalCriteria += 2;
    if (country.languages && Object.values(country.languages).includes(filters.language)) {
      score += 2;
    }
  }

  if (filters.region) {
    totalCriteria += 1;
    if (country.subregion === filters.region) {
      score += 1;
    }
  }

  return totalCriteria > 0 ? (score / totalCriteria) * 100 : 0;
}





function getScoredCountries(countries, filters) {
  return countries.map(country => ({
    ...country,
    score: calculateMatchScore(country, filters)
  })).sort((a, b) => b.score - a.score);
}

function CountryList({ onCountrySelect, selectedCountryCodes, preferences = {} }) {
  const [allCountries, error] = useCountries();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 25;

  useEffect(() => {
    if (allCountries && allCountries.length > 0) {
      setIsLoading(false);
      const scoredCountries = getScoredCountries(allCountries, preferences);
      setFilteredCountries(scoredCountries);
    } else {
      setIsLoading(true);
    }
  }, [allCountries, preferences]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredCountries.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div className="dashboard-container">
      <div className="country-card-container">
        {currentResults.map(country => (
          <div key={country.cca3} className="country-card" onClick={() => onCountrySelect(country.cca3)}>
            <img className="country-flag" src={country.flags.png} alt={`${country.name.common} vlag`} />
            <div className="country-details">
              <p>{country.name.common} - Score: {country.score.toFixed(2)}%</p>
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
